function ys_showLoginDlg(){
    require(["dijit/registry","ready!"],
        function(reg){
            var dlg = reg.byId("mgt_loginDlg");
            //console.log(dlg);
            if(dlg){
                dlg.show();
            }
        }
    );
}

function doLogin(){
    ys_doLogin();
}

function doLoginReset(){
    ys_doLoginReset();
}

function ys_doLoginReset(){
    require(["dijit/registry","dojo/dom-style","ready!"],
        function(reg,domStyle){
            var dlg = reg.byId("mgt_loginDlg");
            if(dlg){
                dlg.reset();
                domStyle.set("login_error_lb", "display", "none");
            }
        }
    );
}

function  ys_doLogin(){

    var url = "../test_res/login.json";
    //var url = "/"+SYS_PATH+"/login/";
    require(["dojo/request/xhr","dijit/registry","dojo/dom-style","dojo/i18n!../js/nls/common.js", "dojo/on", "dojo/_base/json"], 
    		function(xhr,reg,domStyle,common,on,json){

        		var username = reg.byId("mgt_login_username").get("value");
        		var pwd = reg.byId("mgt_login_password").get("value");


        		console.log("PHP SESSIONID = ", YS_PHPSESSID);
         
        		var post_data = json.toJson({username: username, passwd: pwd, phpsessid: YS_PHPSESSID});	
        		xhr(url, {
        			handleAs: "json",
        			method: "POST",
        			data: post_data 
        		}).then(function(user_data){
        			console.log(user_data);
        			
        			if(user_data){
        				
        				if(user_data.success){
 
        					//var uri_user_info = "/"+SYS_PATH+"/user/"+ user_data.id;
        					var uri_user_info = "../test_res/login_user.json";
        					 
        					var user_def = {

                                    "success":true,
                                    "id":"",
                                    "loginname":"",
                                    "dispname":"",
                                    "lastname":"",
                                    "firstname":"",
                                    "email":"",
                                    "tel":"",
                                    "add":"",
                                    "zip":"",
                                    "im":"",
                                    "gender":"",
                                    "birthday":"",
                                    "college":"",
                                    "major":"",
                                    "position":"",
                                    "article":""

                                };
        					
        					xhr(uri_user_info, {handleAs:"json"}).then(function(info_data){
        						console.log(info_data);
        						if(info_data){

        							user_def.id         = info_data.id;
        							user_def.loginname  = info_data.loginname;
        							user_def.dispname   = info_data.dispname;
        							user_def.lastname   = info_data.lastname;
        							user_def.firstname  = info_data.firstname;
        							user_def.email      = info_data.email;
        							user_def.tel        = info_data.tel;
        							user_def.add        = info_data.add;
        							user_def.zip        = info_data.zip;
        							user_def.im         = info_data.im;
        							user_def.gender     = info_data.gender;
        							user_def.birthday   = info_data.birthday;
        							user_def.college    = info_data.college;
        							user_def.major      = info_data.major;
        							user_def.position   = info_data.position;
        							user_def.article    = info_data.article;
        							 

        							console.log("webuser, after login > ", user_def);
 

                                    

                                        var dlg = reg.byId("mgt_loginDlg");
                                        if(dlg){
                                            
                                        	YS_MGT_CURRENT_USER = user_def;
                                            dlg.hide();
                                            domStyle.set("mgt_login_error_lb", "display", "none");
                                            domStyle.set("page_main_toolbar", "display", "block");
                                            
                                            //show calendar
                                            ys_calendar_in_calendar_management_init();
                                            ys_showMainPageForManagementBtnClick("calendar_mgt_borderContainer");
                                             
                                        }else{
                                            console.log("error: loginDlg could not be found!");
                                        }
        						}
                            },function(err){
                                        alert(common.internal_server_error);
                                        return false;
                            });
 

                        }else{
                        domStyle.set("mgt_login_error_lb", "display", "block");
                    }
                }else{
                	console.log("login user form server  1: ", user_data);
                	
                    alert(common.internal_server_error);
                }
                

            }, function(err){
            	
            	console.log("login user form server  2: ", user_data);
                alert(common.internal_server_error);
               
            });
    });

}

function doPasswdRecall(){
	ys_doPasswdRecall();
}

function ys_doPasswdRecall(){
	require(["dijit/registry"], function(reg){
        var dlg = reg.byId("mgt_passwd_recallDlg");

        dlg.show();
    });
}

function doPasswdDlg(){
	ys_doPasswdDlg();
}

function ys_doPasswdDlg(){
	
	
	require(["dijit/registry", "dojo/request/xhr", "dojo/_base/json", "dojo/i18n!../js/nls/common.js"],
			function(reg, xhr, json, common){
        		
				var password_usr   = reg.byId("mgt_password_usr");
				var password_email = reg.byId("mgt_password_email");
				
				var dlg = reg.byId("mgt_passwd_recallDlg");
				var username = password_usr.get("value");
				var email = password_email.get("value");

				//未填写，返回错误
				if("" == username|| "" == email){
					alert(common.fields_empty);					
					return false;
				}

				if(password_email.isValid()){
					var uri =   '/'+SYS_PATH +'/user/';
					xhr(uri,{handleAs: "json"}).then(function(data){
						if(data){
							for(var u in data){
								var user_item =  data[u];
								var login_name = user_item.loginname;
								var mail = user_item.email;

								if(username == login_name && email == mail){

									//服务器端应该实现产生新密码，覆盖旧密码和将新密码发送给目标邮箱
									var check_uri = "../test_res/passwdreset.json";
									//var check_uri = '/'+SYS_PATH +'/passwdreset/';
									var post_data = json.toJson({id:user_item.id, email:mail});

									xhr(check_uri,{handleAs: "json", method:"POST", data:post_data}).then(function(data){

										console.log("callback data", data);
										if(data.success){
											alert(common.pw_send);
											dlg.hide();
										}else{
											//后台服务失败
											alert(common.operation_error);
										}

									},function(err){

									});

								

								}else{
									//输入的邮件无效
									alert(common.username_email_invalid);
									return false;
								}
							}
						}

					}, function(err){
						// 服务请求错误
						alert(common.internal_server_error);
						return false;
					});

				}else{
					//输入的电子邮件格式无效
					alert(common.email_invalid);
					return false;
				}

				return true;

    	});
}