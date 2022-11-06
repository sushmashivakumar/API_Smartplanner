// // login

// {
//     "email":"raju@intel.com",
//     "password": "intel@123"
// }
// error_code
// : 
// 0
// message
// : 
// "Login Successful"
// success
// : 
// true

// //project_list

// data
// : 
// [{project_id: 1, project_name: "KMB"}, {project_id: 2, project_name: "ADLS"},…]
// error_code
// : 
// 0
// message
// : 
// "Fetching Project list Successful "
// success
// : 
// true

// // get milestone
// data
// : 
// [{alpha: "None", ao: "None", beta: "None", bo: "None", es: "None", milestone_id: 1, mode: "High",po: "None", popl_2: "1/10/2022", popl_3: "None", project_id: 2, prq: "31/10/2022"
// , pv: "15/7/2021"}]

// // get dev
// {"data":[{"domain":"Firmware","estimation_type":"HC","feature_owner":"Mohan","features":"FuSA FW","function":"Development","function_owner":"Sridhar","milestone":"PO","mode":"Heavy","project_id":2,"q1":0,"q10":2.0,"q11":2.0,"q12":1.0,"q13":0.5,"q2":0,"q3":0.0,"q4":0.0,"q5":1.0,"q6":3.0,"q7":3.0,"q8":3.0,"q9":3.0,"record_id":6,"status":"No","total_till_prq":18.5},{"domain":"Firmware","estimation_type":"HC","feature_owner":"Mohan","features":"PSE FW","function":"Development","function_owner":"Sridhar","milestone":"PO","mode":"Heavy","project_id":2,"q1":0,"q10":2.0,"q11":2.0,"q12":1.0,"q13":0.5,"q2":0,"q3":0.0,"q4":0.0,"q5":0.5,"q6":1.0,"q7":2.0,"q8":2.0,"q9":2.0,"record_id":7,"status":"No","total_till_prq":13.0},{"domain":"Linux Driver","estimation_type":"HC","feature_owner":"Mohan","features":"Linux I/O","function":"Development","function_owner":"DM","milestone":"PO","mode":"Heavy","project_id":2,"q1":0,"q10":2.0,"q11":2.0,"q12":2.0,"q13":2.0,"q2":0,"q3":0.25,"q4":0.35,"q5":0.5,"q6":2.0,"q7":2.0,"q8":2.0,"q9":2.0,"record_id":8,"status":"No","total_till_prq":17.0},{"domain":"BTI","estimation_type":"BTI","feature_owner":"Mohan","features":"Linux Security CSE BTI","function":"Development","function_owner":"Mike-AI","milestone":"PO","mode":"Heavy","project_id":2,"q1":0,"q10":30.0,"q11":30.0,"q12":45.0,"q13":45.0,"q2":0,"q3":0.0,"q4":0.0,"q5":0.0,"q6":30.0,"q7":30.0,"q8":30.0,"q9":30.0,"record_id":19,"status":"Yes","total_till_prq":270.0},{"domain":"Firmware","estimation_type":"HC","feature_owner":"Mohan","features":"BIOS Val","function":"Development","function_owner":"Arvind","milestone":"PO","mode":"Medium","project_id":2,"q1":0.5,"q10":0.0,"q11":0.0,"q12":0.0,"q13":0.0,"q2":0.5,"q3":1.5,"q4":1.0,"q5":0.5,"q6":0.0,"q7":0.0,"q8":0.0,"q9":0.0,"record_id":null,"status":"ON","total_till_prq":null},{"domain":"Firmware","estimation_type":"HC","feature_owner":"Mohan","features":"BIOS Val","function":"Development","function_owner":"Aravind","milestone":"PO","mode":"Medium","project_id":2,"q1":0.5,"q10":0.0,"q11":0.0,"q12":0.0,"q13":0.0,"q2":0.5,"q3":1.5,"q4":1.0,"q5":0.5,"q6":0.0,"q7":0.0,"q8":0.0,"q9":0.0,"record_id":null,"status":"ON","total_till_prq":null},{"domain":"Firmware","estimation_type":"HC","feature_owner":"Mohan","features":"BIOS Val","function":"Development","function_owner":"Aravind","milestone":"PO","mode":"Medium","project_id":2,"q1":0.5,"q10":0.0,"q11":0.0,"q12":0.0,"q13":0.0,"q2":0.5,"q3":1.5,"q4":1.0,"q5":0.5,"q6":0.0,"q7":0.0,"q8":0.0,"q9":0.0,"record_id":null,"status":"ON","total_till_prq":null}],"error_code":0,"message":"Fetching Development records Successful ","success":true}

// // get budget(post method)
// // request
// {project_id: 2}
// project_id: 2
// // response
// {"data":[{"bti":"$270.00","hardware_resources":"","hc":"$1,164.24","id":1,"models":"SW-Development"},{"bti":"$150.00","hardware_resources":"","hc":"$1,506.31","id":2,"models":"SW-Validation"},{"bti":"$40.00","hardware_resources":"","hc":"$783.76","id":3,"models":"SW-Horizontal"},{"bti":"$460.00","hardware_resources":"","hc":"$4,534.54","id":4,"models":"Total"}],"error_code":0,"message":"Fetching Budget data Successful ","success":true}
