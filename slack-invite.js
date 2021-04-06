//jshint esversion:6
var request = require("request");
function main(params) {

  var email = '';
  var org = 'callforcode';
  var slacktoken = '';

  for (i in params.form_response.answers) {
    answer = params.form_response.answers[i];
    console.log(answer);
    if (answer.type == 'email') {
      console.log('Found email: ' + email);
      console.log('Found email.');
      break;
    }
  }

  console.log('Inviting: ' + email);
  return new Promise((resolve, reject) => {
    request.post({
      url: `https://${org}.slack.com/api/users.admin.invite`,
      form: {
        email: email,
        token: slacktoken,
        set_active: true
      }
    }, (err, httpResponse, body) => {
      if (err) {
        console.log('Error: ' + err);
        reject({ message: "Error" + err });
      } else {
        body = JSON.parse(body);
        if (body.ok) {
          console.log('Success!');
          resolve({
            message: `Success! Check ${email} for an invite from Slack.`
          });
        } else {
          console.log('Error: ' + body.error);
          reject({ message: body.error });
        }
      }
    });
  });
}
exports.main = main;
