// /insert_update_milestone_date(After clicking submit of pmo page)

// Request
// {
//     "milestone_id":2,
//    "project_id":2,
//    "mode":"High",
//    "popl_2":"3/11/2020",
//    "popl_3":"10/12/2020",
//    "po":"16/1/2021",
//    "es":"20/1/2021",
//    "ao":"10/2/2021",
//    "bo":"5/3/2021",
//    "alpha":"10/4/2020",
//    "beta":"10/5/2021",
//    "prq":"3/6/2021",
//    "pv":"15/7/2021"
// }
// Response

// {
//     "error_code": 0,
//     "message": "Updating Milestone dates Successful ",
//     "success": true
// }



// filter milestone(Modes filter)

// Request
// {
//     "project_id":2,
//     "mode": "Heavy"
// }

// Response

// {
//     "data": [],
//     "error_code": 0,
//     "message": "Fetching Milestone data Successful ",
//     "success": true
// }


// POST api for development, validation and horizontal

// Request

// {
//     "project_id":3,
//     "mode":"High",
//     "popl_2":"3/11/2020",
//     "popl_3":"10/12/2020",
//     "po":"16/1/2021",
//     "es":"20/1/2021",
//     "ao":"10/2/2021",
//     "bo":"5/3/2021",
//     "alpha":"10/4/2020",
//     "beta":"10/5/2021",
//     "prq":"3/6/2021",
//     "pv":"15/7/2021"
//  }

// Response

// {
//     "error_code": 0,
//     "message": "Inserting Milestone dates Successful ",
//     "success": true
// }

// POST API for filtering records(while clicking on tabs of dev, val and hor)

// {
//     "project_id":"2",
//     "mode": "Heavy",
//     "function": "Development"
// }

// Response

// {
//     "data": [
//         {
//             "domain": "Firmware",
//             "estimation_type": "BTI",
//             "feature_owner": "Mohan",
//             "features": "BIOS Val",
//             "function": "Development",
//             "function_owner": "Arvind",
//             "milestone": "PO",
//             "mode": "Heavy",
//             "project_id": 2,
//             "q1": 0.5,
//             "q10": 0.0,
//             "q11": 0.0,
//             "q12": 0,
//             "q13": 0,
//             "q2": 0.5,
//             "q3": 1.5,
//             "q4": 1.0,
//             "q5": 0.5,
//             "q6": 0.0,
//             "q7": 0.0,
//             "q8": 0.0,
//             "q9": 0.0,
//             "record_id": 5,
//             "status": "ON",
//             "total_till_prq": 4
//         },
//         {
//             "domain": "Firmware",
//             "estimation_type": "HC",
//             "feature_owner": "Mohan",
//             "features": "BIOS Val",
//             "function": "Development",
//             "function_owner": "Arvind",
//             "milestone": "PO",
//             "mode": "Heavy",
//             "project_id": 2,
//             "q1": 0.5,
//             "q10": 0.0,
//             "q11": 0.0,
//             "q12": 0,
//             "q13": 0,
//             "q2": 0.5,
//             "q3": 1.5,
//             "q4": 1.0,
//             "q5": 0.5,
//             "q6": 0.0,
//             "q7": 0.0,
//             "q8": 0.0,
//             "q9": 0.0,
//             "record_id": 6,
//             "status": "ON",
//             "total_till_prq": 4
//         }
//     ],
//     "error_code": 0,
//     "message": "Fetching Filtered records Successful.",
//     "success": true
// }