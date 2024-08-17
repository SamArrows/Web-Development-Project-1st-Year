- Index.php is the landing page from which new users can sign up or existing users can log in.
- PHP manages cookies and sessions for user profiles and their respective avatars.
- Main gameplay focuses on matching 2-3-4 cards (dependent on level) within a time frame.
- Project intended to make use of a LAMP stack, which was deployed on an Azure virtual machine for submission of the project,
however it only makes use of Apache and PHP and runs on Windows so it is akin to a WAMP stack. To run locally:

- install apache on device; I used apache 2.4
- once installed, we need to install as a service, but first we need to edit the config file to make sure it points to the project
- edit the apache config file to point to the index.php file within the project folder for this web game
-   you can do this by searching within the httpd.conf file for a line which typically looks like this:
-   DocumentRoot "C:/Program Files/Apache Group/Apache2.4/htdocs"
-   you need to modify so that it takes the following format:
-   DocumentRoot "C:/path/to/your/php/file" ==> this should be the LAMP folder, not index.php
-   Next you must set the permissions which may be set as required by default:
-   <Directory "C:/path/to/your/php/file"> ==> same as before, point it to where you save the LAMP folder
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
    <Directory>
-   save these changes
- open powershell and run as administrator, then navigate to the installed apache folder and into the bin directory
- run .\httpd.exe -k install to install apache as a service
- then run .\httpd.exe -k start to start the server
- type localhost/index.php to load the project
  
If you have any other way of running it locally which you would prefer, you can also try that; the basic premise is that the folder is the root and the landing page for the project is index.php
