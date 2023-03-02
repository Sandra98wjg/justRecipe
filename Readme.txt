We have uploaded our final submission to our team's GitHub classroom account on time.
Link to our submission on GitHub: 

We will use the Lubuntu 20.4.1 LTS virtual machine on VirtualBox 6.1.22. 
----------------------------------------------------------------------------------------------------------------------------------------------------------
Download our project files into ~/Desktop/ by git clone: 
	cd Desktop 
	git clone git@github.com:unsw-cse-comp3900-9900-22T3/capstone-project-9900-t14p-just-do-it.git
----------------------------------------------------------------------------------------------------------------------------------------------------------
Steps to set up MySQL: 
1.Update the apt.  Run the command in the terminal: 
	sudo apt update 
2. Run the command in the terminal: 
	sudo apt install mysql-server
3.To set the password of root, check the default user and random password by the command: 
	sudo cat /etc/mysql/debian.cnf 
4. Use the user and password to login the MySQL: 
	mysql -u debian-sys-maint -p 
5. Enter the following commands in sequence to set the root account’s password and create database named recipe: 
	use mysql;
	update user set authentication_string='' where user='root';
	alter user 'root'@'localhost' identified with mysql_native_password by '123';
	create database recipe;
	quit
6. After quiting the MySQL, we need to add database by sql file ‘recipe.sql’ which is in our project file. Use the root and password ‘123’: 
	mysql  -u root –p recipe < recipe.sql

----------------------------------------------------------------------------------------------------------------------------------------------------------
To install nodejs, run the following commands in the terminal: 
	sudo apt install curl
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
	source ~/.bashrc
	nvm install v16.17.1
----------------------------------------------------------------------------------------------------------------------------------------------------------
To install Yarn, run the following commands in the terminal: 
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - 
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
	sudo apt update
	sudo apt install --no-install-recommends yarn
----------------------------------------------------------------------------------------------------------------------------------------------------------
Install JAVA 8, run the following commands in the terminal: 
	sudo apt install openjdk-8-jdk 
----------------------------------------------------------------------------------------------------------------------------------------------------------
Jump to our project folder, and run the following commands in the terminal: 
	cd Desktop/capstone-project-9900-t14p-just-do-it 
	java  -jar recipe-0.0.1-SNAPSHOT.jar 
----------------------------------------------------------------------------------------------------------------------------------------------------------
Open another terminal. Jump to our frontend folder in our project folder, and run the following commands in the terminal: 
	cd Desktop/capstone-project-9900-t14p-just-do-it/frontend/ 
	yarn 
	yarn start 
----------------------------------------------------------------------------------------------------------------------------------------------------------
Finally we can get our page.
----------------------------------------------------------------------------------------------------------------------------------------------------------
To see the swagger API page, use this url: 
	localhost:9090/swagger-ui.html 