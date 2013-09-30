files_proton
=====================


[Prot-On](http://Prot-On.com) is an application that allows you to protect, manage and track the use of all kinds of files that are shared on the Internet, by e-mail or through a cloud service.



This app ofers integration with [Prot-On](http://Prot-On.com) for protecting and managing protected files from the web interface of Owncloud.


## Installation


As this repository contains submodules install this app with the following commands:

```
cd xxxx\owncloud\apps
git clone https://github.com/Prot-On/owncloud_files_proton.git files_proton
cd files_proton
git submodule update --init --recursive
```

## Configuration

This app offers only 3 configurations:

* Drag and Drop Url: The url of the online Prot-On viewer this should be http://dnd.prot-on.com for the public server. If this is not configured the protonized files will be opened with the default viewer in the web.
* Rest API: This is needed for all operations with protected files except viewing them.
* oAuth information and Server url: This is needed to authenticate users and make API calls, if you are using [user_proton](https://github.com/Prot-On/owncloud_user_proton) app this is not needed (only if you want to login via oAuth or use users that are not in Prot-On server).
 
Also the setup gives you a configuration string for Drag and Drop, this is a shared password to allow DnD to access the files for viewing and needs to be added to your DnD configuration (contact us if you want to use it with Prot-On public server).


## Support


If you need help with the configuration or integration of this app please open a ticket or send an email to support@prot-on.com

