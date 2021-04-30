const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const MongoClient=require('mongodb').MongoClient

var db;
var s;

MongoClient.connect('mongodb://localhost:27017/coronavirus',(err,database)=>{
	if(err) return console.log(err)
	db=database.db('coronavirus')
	app.listen(6060,()=>{
		console.log('listening to port number 6060...')
	})
})

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extented:true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/',(req,res)=>{
	db.collection('statewise').find().toArray((err,result)=>{
		if(err) return console.log(err)
		res.render('home.ejs',{data: result})
	})
})

app.get('/create',(req,res)=>{
	res.render('add.ejs')
})

app.get('/updateinfo',(req,res)=>{
	res.render('update.ejs')
})

app.get('/deleteinfo',(req,res)=>{
	res.render('delete.ejs')
})

app.post('/AddData',(req,res)=>{
	db.collection('statewise').save(req.body,(err,result)=>{
		if(err) return console.log(err)
		res.redirect('/')
	})
})

app.post('/UpdateTotalActive',(req,res)=>{
    db.collection('statewise').find().toArray((err,result)=>{
        if(err) return console.log(err)
    for(var i=0;i<result.length;i++){
        if(result[i].Sid==req.body.id){
            s=result[i].TotalActive
            break
        }
    }
    db.collection('statewise').findOneAndUpdate({Sid: req.body.id},{
        $set:{TotalActive: parseInt(s)+ parseInt(req.body.TotalActive)}},{sort:{Sid:-1}},
        (err,result)=>{
            if(err)
                return res.send(err)
            console.log(req.body.id+'updated')
            res.redirect('/')
        })
    })
})

app.post('/UpdateNewActive',(req,res)=>{
    db.collection('statewise').find().toArray((err,result)=>{
        if(err) return console.log(err)
    for(var i=0;i<result.length;i++){
        if(result[i].Sid==req.body.id){
            s=result[i].NewActive
            break
        }
    }
    db.collection('statewise').findOneAndUpdate({Sid: req.body.id},{
        $set:{NewActive: parseInt(s)+ parseInt(req.body.NewActive)}},{sort:{Sid:-1}},
        (err,result)=>{
            if(err)
                return res.send(err)
            console.log(req.body.id+'updated')
            res.redirect('/')
        })
    })
})

app.post('/UpdateTotalRecovery',(req,res)=>{
	db.collection('statewise').find().toArray((err,result)=>{
		if(err)
			return console.log(err)
		for(var i=0;i<result.length;i++){
			if(result[i].Sid==req.body.id)
			{
				s=result[i].TotalRecovery
				break
			}
		}
		db.collection('statewise').findOneAndUpdate({Sid: req.body.id},{
			$set:{TotalRecovery : parseInt(s)+parseInt(req.body.TotalRecovery)}},{sort:{Sid:-1}},
			(err,result)=>{
				if(err)
					return res.send(err)
				console.log(req.body.id+'updates')
				res.redirect('/')
		})
	})
})

app.post('/UpdateNewRecovery',(req,res)=>{
	db.collection('statewise').find().toArray((err,result)=>{
		if(err)
			return console.log(err)
		for(var i=0;i<result.length;i++){
			if(result[i].Sid==req.body.id)
			{
				s=result[i].NewRecovery
				break
			}
		}
		db.collection('statewise').findOneAndUpdate({Sid:req.body.id},{
			$set :{NewRecovery: parseInt(s)+parseInt(req.body.NewRecovery)}},{sort:{sid:-1}},
			(err,result)=>{
				if(err)
					return res.send(err)
				console.log(req.body.id+'updates')
				res.redirect('/')
		})
	})
})

app.post('/UpdateTotalDeath',(req,res)=>{
	db.collection('statewise').find().toArray((err,result)=>{
		if(err)
			return console.log(err)
		for(var i=0;i<result.length;i++){
			if(result[i].Sid==req.body.id)
			{
				s=result[i].TotalDeath
				break
			}
		}
		db.collection('statewise').findOneAndUpdate({Sid:req.body.id},{
			$set :{TotalDeath: parseInt(s)+parseInt(req.body.TotalDeath)}},{sort:{sid:-1}},
			(err,result)=>{
				if(err)
					return res.send(err)
				console.log(req.body.id+'updates')
				res.redirect('/')
		})
	})
})

app.post('/UpdateNewDeath',(req,res)=>{
	db.collection('statewise').find().toArray((err,result)=>{
		if(err)
			return console.log(err)
		for(var i=0;i<result.length;i++){
			if(result[i].Sid==req.body.id)
			{
				s=result[i].NewDeaths
				break
			}
		}
		db.collection('statewise').findOneAndUpdate({Sid:req.body.id},{
			$set :{NewDeaths: parseInt(s)+parseInt(req.body.NewDeaths)}},{sort:{sid:-1}},
			(err,result)=>{
				if(err)
					return res.send(err)
				console.log(req.body.id+'updates')
				res.redirect('/')
		})
	})
})

app.post('/DeleteInfo',(req,res)=>{
	db.collection('statewise').findOneAndDelete({Sid:req.body.id},(err,result)=>{
		if(err)
			return console.log(err)
		res.redirect('/')
	})
})