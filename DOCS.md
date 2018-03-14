# cookwork v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Facebook](#authenticate-with-facebook)
	
- [Kitchen](#kitchen)
	- [Create kitchen](#create-kitchen)
	- [Delete kitchen](#delete-kitchen)
	- [Retrieve kitchen](#retrieve-kitchen)
	- [Retrieve kitchens](#retrieve-kitchens)
	- [Update kitchen](#update-kitchen)
	- [Upload kitchen image(s)](#upload-kitchen-image(s))
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Register new user](#register-new-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	- [Verify user account](#verify-user-account)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## Authenticate with Facebook



	POST /auth/facebook


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Facebook user accessToken.</p>							|

# Kitchen

## Create kitchen



	POST /kitchens


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Kitchen's name.</p>							|
| phone			| 			|  <p>Kitchen's phone.</p>							|
| description			| 			|  <p>Kitchen's description.</p>							|
| type			| 			|  <p>Kitchen's type.</p>							|
| address			| 			|  <p>Kitchen's address.</p>							|
| size			| 			|  <p>Kitchen's size.</p>							|
| AFSCA			| 			|  <p>Kitchen's AFSCA.</p>							|
| VAT			| 			|  <p>Kitchen's VAT.</p>							|
| hours			| 			|  <p>Kitchen's hours.</p>							|
| capacity			| 			|  <p>Kitchen's capacity.</p>							|
| price			| 			|  <p>Kitchen's price.</p>							|
| rent			| 			|  <p>Kitchen's rent.</p>							|
| equipment			| 			|  <p>Kitchen's equipment.</p>							|
| staff			| 			|  <p>Kitchen's staff.</p>							|
| cancellation			| 			|  <p>Kitchen's cancellation.</p>							|
| events			| 			|  <p>Kitchen's events.</p>							|
| standingCapacity			| 			|  <p>Kitchen's standingCapacity.</p>							|
| sittingCapacity			| 			|  <p>Kitchen's sittingCapacity.</p>							|

## Delete kitchen



	DELETE /kitchens/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve kitchen



	GET /kitchens/:id


## Retrieve kitchens



	GET /kitchens


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update kitchen



	PUT /kitchens/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Kitchen's name.</p>							|
| phone			| 			|  <p>Kitchen's phone.</p>							|
| description			| 			|  <p>Kitchen's description.</p>							|
| type			| 			|  <p>Kitchen's type.</p>							|
| address			| 			|  <p>Kitchen's address.</p>							|
| size			| 			|  <p>Kitchen's size.</p>							|
| AFSCA			| 			|  <p>Kitchen's AFSCA.</p>							|
| VAT			| 			|  <p>Kitchen's VAT.</p>							|
| hours			| 			|  <p>Kitchen's hours.</p>							|
| capacity			| 			|  <p>Kitchen's capacity.</p>							|
| price			| 			|  <p>Kitchen's price.</p>							|
| rent			| 			|  <p>Kitchen's rent.</p>							|
| equipment			| 			|  <p>Kitchen's equipment.</p>							|
| staff			| 			|  <p>Kitchen's staff.</p>							|
| cancellation			| 			|  <p>Kitchen's cancellation.</p>							|
| events			| 			|  <p>Kitchen's events.</p>							|
| standingCapacity			| 			|  <p>Kitchen's standingCapacity.</p>							|
| sittingCapacity			| 			|  <p>Kitchen's sittingCapacity.</p>							|

## Upload kitchen image(s)



	POST /kitchens/:id/images/upload


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| image			| 			|  <p>Image to be added.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Register new user



	POST /users/register


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|

## Verify user account



	GET /users/:id



