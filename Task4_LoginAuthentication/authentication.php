<?php      
    include('connection.php');  
    $username = $_POST['user'];  
    $password = $_POST['pass'];  
    
    // To prevent from mysqli injection  
    $username = stripcslashes($username);  
    $password = stripcslashes($password);  
    $username = mysqli_real_escape_string($con, $username);  
    $password = mysqli_real_escape_string($con, $password);  
    
    $sql = "SELECT * FROM login WHERE username = '$username' AND password = '$password'";  
    $result = mysqli_query($con, $sql);  
    
    if (!$result) {
        die("Query failed: " . mysqli_error($con));
    }
    
    $count = mysqli_num_rows($result);  
    
    if ($count == 1) {  
        echo "<h1><center> Login successful </center></h1>";  
    } else {  
        echo "<h1> Login failed. Invalid username or password.</h1>";  
    }     
?>
