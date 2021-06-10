console.log("---------------------------");
console.log("uploadFiles.js");
console.log("---------------------------");
//----------------------------------------
// load modules
//----------------------------------------
var db = require('./databaseConfig.js');
//----------------------------------------
// functions
//----------------------------------------
var uploadFiles={
    checkDuplicateUpload:function(fileChecksum,callback){
        console.log("Checking whether database already exist.");
        sql='SELECT * from g8.projects WHERE hash=?;';//Returns 1 if exist else 0
        db.query(sql,[fileChecksum],function(err,result){
            if(err){
                //err
                return callback(err,null);
            }else{
                console.log(result.length)
                if(result.length){//1=true=exist
                    return callback(null,true);
                }else{//0=false=dont-exist
                    return callback(null,false);
                }
            }
        });
    },
    updateUploadFilesInfo:function(data,callback){
        console.log("Checking whether database already exist.");
        sql='INSERT INTO projects (projectname,hash) VALUES(?,?);';//Returns 1 if exist else 0
        db.query(sql,[data.projectName,data.hash],function(err,result){
            if(err){
                //err
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        });
    },
    deleteUploadFiles:function(id,callback){
        console.log("Deleting project ID:"+id);
        sql='DELETE FROM projects WHERE (`id` = ?)';
        db.query(sql,id,function(err,result){
            if(err){
                return callback(err,null);
            }else{
                return callback(null,result);
            }
        })
    }
}

module.exports = uploadFiles;