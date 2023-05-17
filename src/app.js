const express = require('express');

const port = process.env.PORT || 3000
const failRatePct = process.env.FAIL_RATE_PCT || 50

const app = express();

let failedCnt = 0;
let totalCnt = 1;

app.get('/profiles/:id', (req, res) => {
    var id = req.params.id;
    console.log(`Request profile id ${id}`);
    console.log(`Current fail rate ${currentFailRate()}`);
    if (!shouldFail()) {
        totalCnt++;
        res.status(200).json({
            id: id,
            firstname: "John",
            lastname: "Doe"
        });
    } else {
        totalCnt++;
        failedCnt++;
        res.sendStatus(500);
    }

});

app.listen(port, () => {
    console.log(`Server is started at port ${port}`);
})

function shouldFail(){
    return ((failedCnt/totalCnt)*100.00 < failRatePct)? true : false;
}

function currentFailRate(){
    return (failedCnt/totalCnt)*100.00;
}