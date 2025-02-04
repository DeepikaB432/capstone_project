const express = require('express');
const app = express();
const connection = require('./connection');
const nodemailer = require('nodemailer');
const multer = require('multer');
const verifyUser = require('./verifyToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

const port = 3000;
var cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./uploads')
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
});

const upload = multer({
    storage:storage
});

const transporter = nodemailer.createTransport({
    host:"smtp.ethereal.email",
    port:587,
    secure:false,
    auth:{
        user:"maddison53@ethereal.email",
        pass:"jn7jnAPss4f63QBp6D"
    }
}); 

app.post('/sendemail/',async(request,response)=>{
    const{ name,to_email,subject,message } = request.body;
    console.log(request.body)
    try{
        const result = await transporter.sendMail({
            name:name,
            to: to_email,
            subject:subject,
            text:message
        })
        console.log(result)
        return response.json(result);
    }catch(errors){
        return response.status("400").json(errors);
    }
})

app.get('/', verifyUser ,(req,res) =>{
    res.send("Hello World");
});

app.post('/add_pets_data/', upload.single('files'), async (req,res)=>{
    console.log(req.file,req.body)
    console.log(upload.single('files'))
    const{pet_type,pet_name,location,description,contact_info} = req.body;
    // const file_path = req.file;
    let file_path = req.file ? req.file.path : '';
    console.log(file_path)

    if (file_path) {
        file_path = path.normalize(file_path).replace(/\\/g, '/'); 
        console.log('Normalized file path:', file_path);
    }
    
    try{
        const [data] = await connection.promise().query(`INSERT INTO lost_pets_db.pets
            (pet_type,pet_name,location,description,contact_info,file_path)
            VALUES (?,?,?,?,?,?)`, [pet_type,pet_name,location,description,contact_info,file_path]);
            if(data.affectedRows>0){
                return res.json('Pet added successfully');
            }else{
                return res.json('Failed to insert pet data');
            }
    }catch (errors){
        res.send(errors);
    }
})

// get pets data api
app.get('/get_pets_data/',async (req,res)=>{
    try{
        const [data] = await connection.promise().query('SELECT * FROM lost_pets_db.pets');
        return res.send(data);
    }catch(errors){
        return res.send(errors);
    }
})

//register/sign up api
app.post('/register/', async (req, res) => {
    const { password, confirm_password, first_name, last_name, email } = req.body;
 
    if(!first_name || !password || !email || !confirm_password){
        return res.status(400).json({error: true, message: "Please provide all the required values"});
    }

    if(password != confirm_password){
        return res.status(400).json({ error:true,message:"Password doesn't match"})
    }
 
    //convert or hashed or encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);
 
    try {
        const [data] = await connection.promise().query(`
            INSERT INTO lost_pets_db.users (first_name, last_name, email, password)
            VALUES (?, ?, ?, ?)`, [first_name, last_name, email, hashPassword]);        
        return res.json(data);
    } catch (errors){
        return res.status(400).json(errors);
    }
   
});
 
app.post('/login/', async (req, res) => {
    // Add the logic to get the email and password from postman
    // do the select query to check if the user exist and grab its password for comparison
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Please provide all the required values"});
    }

    try {
        const [data] = await connection.promise().query(`
            SELECT email, password
            FROM lost_pets_db.users
            WHERE email = ?`, email);
            if(data.length > 0){
                const user = data[0];
                const passwordCheck = await bcrypt.compare(password, user.password);
                if(!passwordCheck){
                    return res.status(401).json({message: 'Invalid creds'});    
                } else {
                    //generate the token on success and send it
                    const token = await jwt.sign({ user_id: user.user_id }, "thisismysecretencryptionkey", { expiresIn: '1h' })
                    return res.json({ token: token});
                }
            } else {
                return res.status(400).json({ message: "User doesn't exist."});        
            }
    } catch (errors){
        return res.status(400).json({ message: errors})
    }
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})