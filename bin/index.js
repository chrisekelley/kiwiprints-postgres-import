#!/usr/bin/env node

var pg = require('pg');
var PostgresCouchDB = require('../lib');
var Q = require('kew');


if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}

//Note there is an error in the simple example which i have not tracked down/fixed
//yet it will not restart the stream from where it left off if the feeder is stopped
//
//I am working on the daemon.js in same direcory as this which restarts happily.
//

var settings =
      {
        couchdb: {
         url: 'http://localhost:5984',
         pgtable:  'couchdocs',
         database: 'coconut-moz-2015-reports-test'
       }
      };

pgclient = new pg.Client("postgres://postgres@localhost/kiwiprints");


pgclient.connect(function(err) {
            if (err) {
                if(err.code == 'ECONNREFUSED'){ //try to catch here but i dont think works
                        console.error('ERROR: Connection to postgres refused', err);
                }else{
                        console.error('ERROR: Could not connect to postgres', err);
                }
                process.exit();
            } else {
                console.log('Connected to postgres');
            }
        }) ;


initial_since = get_initial_since(settings.couchdb.pgtable);

createImporter();


function createImporter(){
    settings.since = initial_since;
    var importer = new PostgresCouchDB(pgclient,  settings );

      importer.start();

    //enable what event you want to watch
    importer.events.on('connect', console.log);
    importer.events.on('checkpoint', console.log);
    importer.events.on('checkpoint.error', function(msg, err) {
        console.error(msg, err);
	process.exit(1);
    });

    //importer.events.on('change', console.log);  //very noisy
    importer.events.on('change.error', function(feed, change, err) {
	console.error(feed, err.body, err);
    });

    importer.events.on('change.success', function(change, res, body) {
      var deferred = Q.defer();
      var doc = change.doc;
      var key = doc._id;
      var trichiasisSQL = "INSERT INTO trichiasis\n SELECT doc->>'_id',doc->>'_rev',doc->>'question',doc->>'collection',(doc->>'createdAt')::text::timestamp,(doc->>'lastModifiedAt')::text::timestamp,doc->>'serviceLocation',doc->>'DateOfVisit',doc->>'TimeOfVisit',doc->>'RefusedSurgeryL',doc->>'ProvidedEpilationConsultationL',doc->>'visualAcuityL',doc->>'countLashesTouchingEyeballL',doc->>'evidenceOfEpilationL',doc->>'photographPreOpL',doc->>'cataractL',doc->>'cornealOpacityL',doc->>'acceptedSurgeryL',doc->>'TypeofOperationL',doc->>'ClampusedL',doc->>'SutureTypeL',doc->>'ExcessbleedingL',doc->>'MarginfragmantseveredL',doc->>'GlobePunctureL',doc->>'ComplicationsReferralL',doc->>'ReferralHospitalL',doc->>'RefusedSurgeryR',doc->>'ProvidedEpilationConsultationR',doc->>'visualAcuityR',doc->>'countLashesTouchingEyeballR',doc->>'evidenceOfEpilationR',doc->>'photographPreOpR',doc->>'cataractR',doc->>'cornealOpacityR',doc->>'acceptedSurgeryR',doc->>'TypeofOperationR',doc->>'ClampusedR',doc->>'SutureTypeR',doc->>'ExcessbleedingR',doc->>'MarginfragmantseveredR',doc->>'GlobePunctureR',doc->>'ComplicationsReferralR',doc->>'ReferralHospitalR',doc->>'complete',doc->>'currentDistrict',doc->>'user',doc->>'clientId', (doc->'currentPosition' ->'coords'->>'longitude')::text::double precision AS longitude, (doc->'currentPosition' ->'coords'->>'latitude')::text::double precision AS latitude, to_timestamp((doc->'currentPosition' ->>'timestamp')::text::double precision) AS gps_timestamp FROM couchdocs WHERE id = '" + key + "';"
      var indiv_regSQL = "INSERT INTO indiv_reg\n select doc->>'_id',doc->>'_rev',doc->>'District',doc->>'Gender',doc->>'DOB',doc->>'registrationLocation',doc->>'previouslyRegisterredNowOffline',doc->>'question',doc->>'collection',(doc->>'createdAt')::text::timestamp,(doc->>'lastModifiedAt')::text::timestamp,doc->>'complete',doc->'currentDistrict',doc->>'savedBy'from couchdocs WHERE id = '" + key + "';"
      //console.log("key: " + key + " doc: " + JSON.stringify(doc));
      var pgtable = "";
      var deleteSql = "";
      if (doc.question == "Trichiasis Surgery") {
        var pgtable = "trichiasis";
        sql = trichiasisSQL
        deleteSql = "DELETE FROM " + pgtable + " WHERE _id='" + key + "'";
      } else {
        var pgtable = "indiv_reg";
        sql = indiv_regSQL;
        deleteSql = "DELETE FROM " + pgtable + " WHERE _id='" + key + "'";
      }

      if (res.state == "Updated") {
        pgclient.query(deleteSql, function(err, result) {
          if (err) {
            console.error(pgtable + ": " + ' ' + deleteSql, err);
            deferred.reject(err);
          } else {
            console.log(pgtable + ": " + doc._id + " deleted");
            pgclient.query(sql, function(err, result) {
              if (err) {
                console.error(pgtable + ": " + ' ' + sql, err);
                deferred.reject(err);
              } else {
                console.log(pgtable + ": " + doc._id + " updated/added");
                deferred.resolve(doc._id);
              }
            });
            //deferred.resolve(doc._id);
          }
        });
        console.log(res.state + ":" + change.id + " res: " + JSON.stringify(res));
      } else if (res.state == "No change") {
        console.log(res.state + ":" +  change.id + " res: " + JSON.stringify(res));
      } else {
        console.log(res.state + ":" +  change.id + " res: " + JSON.stringify(res));
        pgclient.query(sql, function(err, result) {
          if (err) {
            //console.error(pgtable + ": " + ' ' + sql, err);
            deferred.reject(err);
          } else {
            //  console.log(pgtable + ": " + doc._id + " added");
            deferred.resolve(doc._id);
          }
        });
      }

    });

    importer.events.on('error', function(msg, err) { console.error(msg, err); });

    //importer.events.on('drain', console.log);

    importer.events.on('stop', function(key) {
    	console.log(key + ': stopped');
    });

}



function get_initial_since(feedname) {
    var sql = '';
                sql = "SELECT since FROM since_checkpoints WHERE pgtable='" + feedname + "' AND enabled=True";
                pgclient.query(sql, function(err, result) {
                    if (err) {
                        console.error(feedname + ": Could not get pgtables and checkpoints with: " + sql, err);
                        process.exit();
                    } else {
                        if (result.rows.length > 0) {
                            console.log(feedname + ': initial since=' + result.rows[0].since);
                            initial_since = result.rows[0].since;
                        } else {
                            sql = "INSERT INTO since_checkpoints ";
                            sql += "(pgtable, since, enabled) VALUES ";
                            sql += "('" + feedname + "', 0, True)";
                            pgclient.query(sql, function(err, result) {
                                if (err) {
                                    console.error(feedname + ': Unable to insert row "' + feedname + '"into table', sql, err);
                                    process.exit();
                                } else {
                                    console.log(feedname + ': Added to since_checkpoint table');
                                    initial_since = 0;
                                }
                            });
                        }
                    }
                });

}

