function ys_setGuiLabelAndTitle(){
	require(["dojo/i18n!../js/nls/common.js", "dojo/dom", "dijit/registry"],
		function (common, dom, reg) {
				
			reg.byId("mgt_login_ok").set("label", common.btn_ok);
			reg.byId("mgt_login_reset").set("label", common.btn_reset);
			reg.byId("mgt_passwd_recallDlg_ok").set("label", common.btn_ok);
			reg.byId("mgt_passwd_recallDlg_cl").set("label", common.btn_cancel);
			
			
			reg.byId("mgt_loginDlg").set("title", common.login);
			reg.byId("mgt_passwd_recallDlg").set("title", common.passwd_recall);
			
			reg.byId("article_mgt_btn").set("label", common.article_mgt);
			reg.byId("calendar_mgt_btn").set("label", common.calendar_mgt);
			reg.byId("welcome_btn").set("label", common.welcome);
			reg.byId("pw_chg_btn").set("label", common.chg_pw);
			reg.byId("logout_btn").set("label", common.logout);
			
			
			dom.byId("mgt_login_usr_lb").innerHTML = common.login_username;
	        dom.byId("mgt_login_pwd_lb").innerHTML = common.login_pwd;
	        dom.byId("mgt_login_error_lb").innerHTML = common.login_err;
	        dom.byId("mgt_password_forgot_lb").innerHTML = common.pw_forgot;  
	        dom.byId("mgt_password_forgot_text_lb").innerHTML = common.pw_forgot_tips; 
            dom.byId("mgt_password_usr_lb").innerHTML = common.login_username;  
            dom.byId("mgt_password_email_lb").innerHTML = common.email;
//            dom.byId("mgt_password_reset_text").innerHTML = common.chg_pw_tips + "&nbsp;(" + common.password_format + ")";
//            dom.byId("mgt_old_password_lb").innerHTML = common.old_pw;
//            dom.byId("mgt_new_password_lb").innerHTML = common.new_pw;
//            dom.byId("mgt_new_password_2_lb").innerHTML = common.new_pw;
            
            reg.byId("calendar_mgt_calendar_tp").set("title", common.calendar);
            reg.byId("calendar_mgt_event_properties_tp").set("title", common.event_properties);
            
            dom.byId("calendar_mgt_summery_lb").innerHTML = common.summary;
            dom.byId("calendar_mgt_time_start_lb").innerHTML = common.start;
            dom.byId("calendar_mgt_time_end_lb").innerHTML = common.end;
            dom.byId("calendar_mgt_calendar_select_lb").innerHTML = common.calendar;
            dom.byId("calendar_mgt_calendar_team_checkbox_lb").innerHTML = common.team_calendar;
            dom.byId("calendar_mgt_calendar_public_checkbox_lb").innerHTML = common.public_calendar;
            dom.byId("calendar_mgt_all_day_checkbox_lb").innerHTML = common.all_day;
            
            reg.byId("calendar_mgt_event_update_btn").set("label", common.btn_update);
            reg.byId("calendar_mgt_event_delete_btn").set("label", common.btn_delete);
		
		
	 });
	 
}