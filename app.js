const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(morgan())
app.use(express.json())

const productroute = require("./routes/productroute")
const orderroute = require("./routes/orderroute")
const userroute = require("./routes/userroute")
const mongoose  = require("mongoose")

app.use("/api", productroute)
app.use("/api", orderroute)
app.use("/api", userroute)
app.use('/uploads', express.static('uploads'))

app.use("/home", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "You are in home page"
    })
})

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://0.0.0.0:27017/shop').then(() => {
    console.log("Database connected")
}).catch(err => {
    console.log("Something went wrong while connecting database", err)
})

const port = process.env.port || 7000
app.listen(port, async () => {
    console.log(`server is running on http://localhost:${port}`)
})