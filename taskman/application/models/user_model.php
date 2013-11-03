<?php defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {
	
	function AddUser($options = array())
	{
		$qualificationArray = array('username', 'password', 'dispname');
    	foreach($qualificationArray as $qualifier)
    	{
        	if(isset($options[$qualifier])) 
        	$this->db->set($qualifier, $options[$qualifier]);
    	}

    	//$this->db->set('uid'，uniqid());
    	$this->db->insert('tsk_users');
    	return $this->db->insert_id();
	}

	function UpdateUser($options = array())
	{
	
	}

	function DeleteUser($options = array())
	{
	
	}

	function GetUsers($options = array())
	{
	
	}

	function GetUser($options = array())
	{
		$qualificationArray = array('username', 'password');
    foreach($qualificationArray as $qualifier)
    {
        if(isset($options[$qualifier])) 
        $this->db->where($qualifier, $options[$qualifier]);
    }
    $query = $this->db->get('tsk_users');
    
    if($query->num_rows() == 0) 
    	return array('success'=>false);

    if(isset($options['username']) && isset($options['password']))
    {

        return array_merge(array('success'=>true),$query->row(0));
    }

	}
}
