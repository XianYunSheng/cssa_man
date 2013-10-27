function ys_setGuiLabelAndTitle(){
	require(["dojo/i18n!../js/nls/common.js", "dojo/dom", "dijit/registry"],
		function (common, dom, reg) {
				
			reg.byId("mgt_login_ok").set("label", common.btn_ok);
			reg.byId("mgt_login_reset").set("label", common.btn_reset);
			
			reg.byId("mgt_loginDlg").set("title", common.login);
			
			dom.byId("mgt_login_usr_lb").innerHTML = common.login_username;
	        dom.byId("mgt_login_pwd_lb").innerHTML = common.login_pwd;
	        dom.byId("mgt_login_error_lb").innerHTML = common.login_err;
	        dom.byId("mgt_password_forgot_lb").innerHTML = common.pw_forgot;
		
		
	 });
	 
}