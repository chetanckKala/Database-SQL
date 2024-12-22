const express = require ("express")
const app = express()
const port = 8080
const {faker, th} = require('@faker-js/faker')
const mysql = require("mysql2")
const path = require("path")
const methodOverride = require("method-override")
const { v4: uuidv4 } = require('uuid');

app.listen(port, ()=> { console.log("server activated on", port) })

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())





const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta',
    password: '#CKjee1210'
});


// home route
app.get("/", (req, res)=>
{
    let q = "SELECT count(id) FROM user";
    try 
    {
        connection.query(q, (err, result)=>
        {
            if (err) throw err
            console.log(result)
            const count = result[0]["count(id)"]
            res.render("home.ejs", {count})
        })
    }
    catch(err) 
    { 
        console.log(err)
        res.send("some error occured")
    }

})

// users route
app.get("/users", (req, res)=>
{
    let q = "SELECT * FROM user";
    try 
    {
        connection.query(q, (err, result)=>
        {
            if (err) throw err
            console.log("Data loaded successfully")
            res.render("users.ejs", {result})
        })
    }
    catch(err) 
    { 
        console.log(err)
        res.send("some error occured")
    }
})



// update route
app.patch("/users/:id", (req, res)=>
{
    
    let q = "UPDATE user SET username=?, email=?, password=? WHERE (id=?)";
    let x = [req.body.username, req.body.email, req.body.password, req.params.id];

    try 
    {
        connection.query(q, x, (err, result)=>
        {
            if (err) throw err;
            console.log("Edited successfully")
            res.redirect("/users") 
            // console.alert("Success!")
        })
        
    }
    catch(err) 
    { 
        console.log(err)
        res.send("some error occured")
    }
})



// edit route
app.get("/users/:id/edit", (req, res)=>
{
    
    let q = "SELECT * FROM user WHERE (id=?)"
    let x = req.params.id

    try 
    {
        connection.query(q, x, (err, result)=>
        {
            if (err) throw err
            console.log("redirected successfully")
            // res.send(result)
            res.render("edit.ejs", {result})
        })
    }
    catch(err) 
    { 
        console.log(err)
        res.send("some error occured")
    }
})



// add route
app.get("/users/new", (req, res)=>
{
    const new_id = uuidv4()
    console.log("redirected successfully")
    res.render("new.ejs", {new_id})
    // res.send("success")
})

// post route
app.post("/users/:id", (req, res)=>
{
    let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
    let x = [req.params.id, req.body.username, req.body.email, req.body.password];

    try 
    {
        connection.query(q, x, (err, result)=>
        {
            if (err) throw err;
            console.log("inserted successfully")
            res.redirect("/users") 
            // console.alert("Success!")
        })
        
    }
    catch(err) 
    { 
        console.log(err)
        res.send("some error occured")
    }
})

// delete route
app.delete("/users/:id", (req, res)=>
{
    let q = "DELETE FROM user WHERE id = ?";
    let x = [req.params.id];

    try 
    {
        connection.query(q, x, (err, result)=>
        {
            if (err) throw err;
            console.log("deleted successfully")
            res.redirect("/users") 
            // console.alert("Success!")
        })
        
    }
    catch(err) 
    { 
        console.log(err)
        res.send("some error occured")
    }
})