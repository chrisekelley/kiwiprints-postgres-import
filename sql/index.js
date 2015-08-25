module.exports = {
  adminRegistration: "INSERT INTO admin_reg " +
  "SELECT doc->>'_id',doc->>'_rev',doc->>'Name',doc->>'email',doc->>'Profession',doc->>'Association',"
  +"doc->>'District',doc->>'question',doc->>'collection',(doc->>'createdAt')::text::timestamp," +
  "(doc->>'lastModifiedAt')::text::timestamp,doc->>'complete',doc->>'currentDistrict',doc->>'user', " +
  "doc->>'clientId', doc->>'version_code', doc->>'serviceUuid', doc->>'createdByOfflineUser', " +
  "(doc->'currentPosition' ->'coords'->>'latitude')::text::double precision AS latitude, " +
  "(doc->'currentPosition' ->'coords'->>'longitude')::text::double precision AS longitude, " +
  "to_timestamp((doc->'currentPosition' ->>'timestamp')::text::double precision / 1000) AS gps_timestamp,doc->>'gps_name',doc->>'gps_city',doc->>'gps_country',doc->>'deviceUuid' " +
  "FROM couchdocs ",
  //"WHERE doc @> '{\"question\":\"Individual Registration\" }';",

  indivRegistration: "INSERT INTO indiv_reg " +
  "SELECT doc->>'_id',doc->>'_rev',doc->>'District',doc->>'Gender',doc->>'DOB',doc->>'registrationLocation',"
+"doc->>'previouslyRegisterredNowOffline',doc->>'question',doc->>'collection',(doc->>'createdAt')::text::timestamp," +
"(doc->>'lastModifiedAt')::text::timestamp,doc->>'complete',doc->>'currentDistrict',doc->>'user', " +
  "doc->>'clientId', doc->>'version_code', doc->>'serviceUuid', doc->>'createdByOfflineUser', " +
  "(doc->'currentPosition' ->'coords'->>'latitude')::text::double precision AS latitude, " +
  "(doc->'currentPosition' ->'coords'->>'longitude')::text::double precision AS longitude, " +
  "to_timestamp((doc->'currentPosition' ->>'timestamp')::text::double precision / 1000) AS gps_timestamp,doc->>'gps_name',doc->>'gps_city',doc->>'gps_country',doc->>'deviceUuid' " +
"FROM couchdocs ",
  //"WHERE doc @> '{\"question\":\"Individual Registration\" }';",

  trichiasisSQL:"INSERT INTO trichiasis " +
  "SELECT doc->>'_id',doc->>'_rev',doc->>'question',doc->>'collection',(doc->>'createdAt')::text::timestamp, " +
"(doc->>'lastModifiedAt')::text::timestamp,doc->>'serviceLocation', doc->>'DateOfVisit',doc->>'TimeOfVisit',doc->>'RefusedSurgeryL'," +
"doc->>'ProvidedEpilationConsultationL',doc->>'visualAcuityL', doc->>'countLashesTouchingEyeballL',doc->>'evidenceOfEpilationL'," +
"doc->>'photographPreOpL',doc->>'cataractL',doc->>'cornealOpacityL', doc->>'acceptedSurgeryL',doc->>'TypeofOperationL'," +
"doc->>'ClampusedL',doc->>'SutureTypeL',doc->>'ExcessbleedingL', doc->>'MarginfragmantseveredL',doc->>'GlobePunctureL'," +
"doc->>'ComplicationsReferralL',doc->>'ReferralHospitalL', doc->>'RefusedSurgeryR',doc->>'ProvidedEpilationConsultationR'," +
"doc->>'visualAcuityR',doc->>'countLashesTouchingEyeballR', doc->>'evidenceOfEpilationR',doc->>'photographPreOpR'," +
"doc->>'cataractR',doc->>'cornealOpacityR',doc->>'acceptedSurgeryR', doc->>'TypeofOperationR',doc->>'ClampusedR',doc->>'SutureTypeR'," +
"doc->>'ExcessbleedingR',doc->>'MarginfragmantseveredR', doc->>'GlobePunctureR',doc->>'ComplicationsReferralR',doc->>'ReferralHospitalR'," +
"doc->>'complete',doc->>'currentDistrict', doc->>'user'," +
  "doc->>'clientId',  doc->>'version_code', doc->>'serviceUuid', doc->>'createdByOfflineUser', " +
  "(doc->'currentPosition' ->'coords'->>'latitude')::text::double precision AS latitude, " +
  "(doc->'currentPosition' ->'coords'->>'longitude')::text::double precision AS longitude, " +
"to_timestamp((doc->'currentPosition' ->>'timestamp')::text::double precision / 1000) AS gps_timestamp,doc->>'gps_name',doc->>'gps_city',doc->>'gps_country',doc->>'deviceUuid' " +
"FROM couchdocs ",
  //"WHERE doc @> '{\"question\":\"Trichiasis Surgery\" }';",

  postOpFollowup:"INSERT INTO post_operative_followup " +
  "SELECT doc->>'_id',doc->>'_rev',doc->>'question',doc->>'collection',(doc->>'createdAt')::text::timestamp, " +
"(doc->>'lastModifiedAt')::text::timestamp,doc->>'serviceLocation', doc->>'DateOfVisit',doc->>'TimeOfVisit', " +
"(doc->>'CompletedTreatment')::text::boolean, (doc->>'ComplicationsReferralR')::text::boolean, " +
"(doc->>'Complicationsrefertoclinichospital')::text::boolean, (doc->>'Continuemonitoring')::text::boolean, doc->>'Followupdate', " +
"doc->>'Nameofprocedurebeingfollowed', (doc->>'Recurrence')::text::boolean, doc->>'ReferralHospitalR', " +
"(doc->>'complete')::text::boolean, doc->>'currentDistrict', doc->>'user', " +
  "doc->>'clientId',  doc->>'version_code', doc->>'serviceUuid', doc->>'createdByOfflineUser', " +
  "(doc->'currentPosition' ->'coords'->>'latitude')::text::double precision AS latitude, " +
  "(doc->'currentPosition' ->'coords'->>'longitude')::text::double precision AS longitude, " +
"to_timestamp((doc->'currentPosition' ->>'timestamp')::text::double precision / 1000) AS gps_timestamp,doc->>'gps_name',doc->>'gps_city',doc->>'gps_country',doc->>'deviceUuid' " +
"FROM couchdocs ",
  //"WHERE doc @> '{\"question\":\"Post-Operative Followup\" }';",

  PostOperativeEpilation : "INSERT INTO post_operative_epilation " +
  "SELECT doc->>'_id',doc->>'_rev',doc->>'question',doc->>'collection',(doc->>'createdAt')::text::timestamp, " +
    "(doc->>'lastModifiedAt')::text::timestamp,doc->>'serviceLocation', doc->>'DateOfVisit',doc->>'TimeOfVisit', " +
    "doc->>'adviceForSurgeryL', doc->>'adviceForSurgeryR', doc->>'cornealOpacityL', doc->>'cornealOpacityR', doc->>'countLashesTouchingEyeballL', " +
    "doc->>'countLashesTouchingEyeballR', doc->>'Observations', doc->>'visualAcuityL', doc->>'visualAcuityR', " +
    "(doc->>'complete')::text::boolean, doc->>'currentDistrict', doc->>'user', " +
  "doc->>'clientId',  doc->>'version_code', doc->>'serviceUuid', doc->>'createdByOfflineUser', " +
  "(doc->'currentPosition' ->'coords'->>'latitude')::text::double precision AS latitude, " +
  "(doc->'currentPosition' ->'coords'->>'longitude')::text::double precision AS longitude, " +
    "to_timestamp((doc->'currentPosition' ->>'timestamp')::text::double precision / 1000) AS gps_timestamp,doc->>'gps_name',doc->>'gps_city',doc->>'gps_country',doc->>'deviceUuid' " +
    "FROM couchdocs ",
  //"WHERE doc @> '{\"question\":\"PostOperativeEpilation\" }';",

  PostOperativeFollowup_1day : "INSERT INTO post_operative_followup_1day " +
  "SELECT doc->>'_id',doc->>'_rev',doc->>'question',doc->>'collection',(doc->>'createdAt')::text::timestamp, " +
    "(doc->>'lastModifiedAt')::text::timestamp,doc->>'serviceLocation', doc->>'DateOfVisit',doc->>'TimeOfVisit', " +
    "(doc->>'azithromycinR')::text::boolean, (doc->>'tetracyclineEyeOintmentR')::text::boolean, (doc->>'complete')::text::boolean, " +
    "doc->>'currentDistrict', doc->>'user', " +
  "doc->>'clientId',  doc->>'version_code', doc->>'serviceUuid', doc->>'createdByOfflineUser', " +
  "(doc->'currentPosition' ->'coords'->>'latitude')::text::double precision AS latitude, " +
  "(doc->'currentPosition' ->'coords'->>'longitude')::text::double precision AS longitude, " +
    "to_timestamp((doc->'currentPosition' ->>'timestamp')::text::double precision / 1000) AS gps_timestamp,doc->>'gps_name',doc->>'gps_city',doc->>'gps_country',doc->>'deviceUuid' " +
    "FROM couchdocs ",
  //"WHERE doc @> '{\"question\":\"PostOperativeFollowup_1day\" }';",

  PostOperativeFollowup_3_6_months : "INSERT INTO post_operative_followup_3_6_months " +
  "SELECT doc->>'_id',doc->>'_rev',doc->>'question',doc->>'collection',(doc->>'createdAt')::text::timestamp, " +
    "(doc->>'lastModifiedAt')::text::timestamp,doc->>'serviceLocation', doc->>'DateOfVisit',doc->>'TimeOfVisit', " +
    "doc->>'countLashesTouchingEyeballL', doc->>'countLashesTouchingEyeballR', doc->>'outcomeL', doc->>'outcomeR', " +
    "(doc->>'patientDevelopedTrichiasisL')::text::boolean, (doc->>'patientDevelopedTrichiasisR')::text::boolean, " +
    "(doc->>'complete')::text::boolean, doc->>'currentDistrict', doc->>'user', " +
  "doc->>'clientId', doc->>'version_code', doc->>'serviceUuid', doc->>'createdByOfflineUser', " +
  "(doc->'currentPosition' ->'coords'->>'latitude')::text::double precision AS latitude, " +
  "(doc->'currentPosition' ->'coords'->>'longitude')::text::double precision AS longitude, " +
    "to_timestamp((doc->'currentPosition' ->>'timestamp')::text::double precision / 1000) AS gps_timestamp,doc->>'gps_name',doc->>'gps_city',doc->>'gps_country',doc->>'deviceUuid' " +
    "FROM couchdocs ",
  //"WHERE doc @> '{\"question\":\"PostOperativeFollowup_3_6_months\" }';",

  PostOperativeFollowup_7_14_days : "INSERT INTO post_operative_followup_7_14_days " +
  "SELECT doc->>'_id',doc->>'_rev',doc->>'question',doc->>'collection',(doc->>'createdAt')::text::timestamp, " +
    "(doc->>'lastModifiedAt')::text::timestamp,doc->>'serviceLocation', doc->>'DateOfVisit',doc->>'TimeOfVisit', " +
    "(doc->>'defectsEyelidL')::text::boolean, (doc->>'defectsEyelidR')::text::boolean, (doc->>'granulomaExcisionL')::text::boolean, " +
    "(doc->>'granulomaExcisionR')::text::boolean, (doc->>'granulomaL')::text::boolean, (doc->>'granulomaR')::text::boolean, " +
    "(doc->>'infectionL')::text::boolean, (doc->>'infectionR')::text::boolean, doc->>'numberReturnInDaysMonthsL', " +
    "doc->>'numberReturnInDaysMonthsR', (doc->>'referredToHospitalL')::text::boolean, (doc->>'referredToHospitalR')::text::boolean, " +
    "doc->>'referredToHospitalTextL', doc->>'referredToHospitalTextR', (doc->>'removalOfSuturesL')::text::boolean, " +
    "(doc->>'removalOfSuturesR')::text::boolean, (doc->>'returnForFollowupL')::text::boolean, (doc->>'returnForFollowupR')::text::boolean, " +
    "doc->>'returnInDaysMonthsL', doc->>'returnInDaysMonthsR', (doc->>'subCorrectionL')::text::boolean, (doc->>'subCorrectionR')::text::boolean, " +
    "(doc->>'complete')::text::boolean, doc->>'currentDistrict', doc->>'user'," +
    "doc->>'clientId',  doc->>'version_code', doc->>'serviceUuid', doc->>'createdByOfflineUser', " +
  "(doc->'currentPosition' ->'coords'->>'latitude')::text::double precision AS latitude, " +
  "(doc->'currentPosition' ->'coords'->>'longitude')::text::double precision AS longitude, " +
    "to_timestamp((doc->'currentPosition' ->>'timestamp')::text::double precision / 1000) AS gps_timestamp,doc->>'gps_name',doc->>'gps_city',doc->>'gps_country',doc->>'deviceUuid' " +
    "FROM couchdocs ",
  //"WHERE doc @> '{\"question\":\"PostOperativeFollowup_7_14_days\" }';"
}
