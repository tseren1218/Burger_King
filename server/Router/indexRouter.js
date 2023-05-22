const express = require('express');
const Pool = require('pg-pool')

const router = express.Router()

const pool = new Pool ({
    host: 'localhost',
    port: 5432,
    database: 'burger_king',
    user: 'postgres',
    password: '123'
    
})

router.get('/',(req, res)=>{ // herhen bolovsruulah parametr 
    pool.query(`SELECT json_agg(public.burgers.*) FROM public.burgers`,(err, result)=>{
        if(err){
            console.log(err)
        }
        res.status(200).json(result.rows[0].json_agg) // 200-ok 404 not found
    })

})


router.get('/:id',(req, res)=>{ // herhen bolovsruulah parametr 
    const {id} = req.params
    pool.query(`SELECT json_agg(public.burgers.*) FROM public.burgers WHERE id= ${id}`,(err, result)=>{
        if(err){
            console.log(err)
        }
        res.status(200).json(result.rows[0].json_agg) // 200-ok 404 not found
    })

})


module.exports = router