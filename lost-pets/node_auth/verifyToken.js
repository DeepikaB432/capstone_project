const jwt = require('jsonwebtoken');

function verifyUser(request, response, next){
    const token = request.header('Authorization');
    console.log(token);

    if(!token) return response.status('401').json("Unauthorized User");

    try {
        const decoded_token = jwt.verify(token, 'thisismysecretencryptionkey')
        console.log(decoded_token);
        next();
    } catch (errors) {
        return response.status("401").json(errors);
    }
}

module.exports = verifyUser;