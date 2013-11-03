<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Example
 *
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array.
 *
 * @package		CodeIgniter
 * @subpackage	Rest Server
 * @category	Controller
 * @author		Phil Sturgeon
 * @link		http://philsturgeon.co.uk/code/
*/

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH.'/libraries/REST_Controller.php';

class login extends REST_Controller
{
	function index_post()
	{
		$usrname = $this -> post('username');

		$pwd = $this -> post('password');



		$result = $this -> user_model -> login(array('username' => $usrname, 'password' => $password));

		$this -> response(json_encode($result),200);
	}


}