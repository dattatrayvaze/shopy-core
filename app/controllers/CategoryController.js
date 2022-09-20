const Category = require("../models/category");
var alert = require('alert');


exports.getAllCategories=(req,res)=>{
    let categories=Category.findAll({
      attributes:[  "name","id"
       
    ]
    }).then(categories=>{
        res.status(200).json({
            categories
        })
    })
    
}

exports.getOneCategory=(req,res)=>{
    let id=req.params.id
    let category=Category.findOne({
        where:{id:id}
    }).then(category=>{
        res.status(200).json({
            category
        })
    })
    
}
exports.addCategoryPage = (req, res, next) => {
	//res.render('sign_up',{layout: 'login_layout', signUpPage: true, errorMessage: message(req), oldInput: oldInput(req)});

    res.render('addCate',{layout:'login_layout',addCategoryPage:true,errorMessage:" message(req)"})
};


exports.addCategory=(req,res)=>{

    let info={
        name:req.body.name,
    }
    const category= Category.create(info).then(category=>{
       
        //alert('login')
        res.json(category.name  )
        
    }).catch(err=>{

    res.json(err.message);
    })
    
   
}

exports.updateCategory=(req,res)=>{
    let id=req.params.id
    if(req.body.name===""){
        return res.status(400).json("name cant be null")
    }
    const category=Category.update(req.body,{
        where:{id:id}
        
    }).then(cate=>{
        if(cate.name!==""){
            res.status(400).json("category created succ")          
        }
    }).catch(err=>{
        res.status(400).json(err.message)

    })       
}


exports.deleteCategory=(req,res)=>{
    let id=req.params.id
    
    let cate=Category.destroy({
        where:{id:id}
    }).then(prod=>{
    res.status(200).json("prod deleted");

    }).catch(err=>{
    res.status(400).json(err.message);

    })
    res.status.json("prod deleted");
}
