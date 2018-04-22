# cookwork v1.0.0

This is the main backend API for the cookwork project.

- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Facebook](#authenticate-with-facebook)
	
- [Info](#info)
	- [Create info](#create-info)
	- [Delete info](#delete-info)
	- [Retrieve info](#retrieve-info)
	- [Retrieve infos](#retrieve-infos)
	
- [Kitchen](#kitchen)
	- [Create kitchen](#create-kitchen)
	- [Delete kitchen image(s)](#delete-kitchen-image(s))
	- [Delete kitchen](#delete-kitchen)
	- [Find kitcher by user id](#find-kitcher-by-user-id)
	- [Retrieve kitchen](#retrieve-kitchen)
	- [Retrieve kitchens](#retrieve-kitchens)
	- [Update kitchen](#update-kitchen)
	- [Upload kitchen image](#upload-kitchen-image)
	
- [Order](#order)
	- [Create order](#create-order)
	- [Delete order](#delete-order)
	- [Retrieve order](#retrieve-order)
	- [Retrieve orders](#retrieve-orders)
	- [Update order](#update-order)
	
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

## Authenticate with Facebook



	POST /auth/facebook


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Facebook user accessToken.</p>							|

# Info

## Create info



	POST /infos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| activity			| String			|  <p>User's activity.</p>							|
| purpose			| String			| **optional** <p>User's renting purpose.</p>							|
| region			| String			| **optional** <p>User's target region.</p>							|
| phone			| String			| **optional** <p>User's phone.</p>							|
| type			| String			| **optional** <p>User's target kitchen type.</p>							|
| dateFrom			| Date			| **optional** <p>User's dateFrom.</p>							|
| dateTo			| Date			| **optional** <p>User's dateTo.</p>							|
| daysFrom			| Number			| **optional** <p>User's daysFrom.</p>							|
| daysTo			| Number			| **optional** <p>User's daysTo.</p>							|
| hoursFrom			| Number			| **optional** <p>User's hoursFrom.</p>							|
| hoursTo			| Number			| **optional** <p>User's hoursTo.</p>							|
| comments			| String			| **optional** <p>User's comments.</p>							|

## Delete info



	DELETE /infos/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve info



	GET /infos/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve infos



	GET /infos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Kitchen

## Create kitchen



	POST /kitchens


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| String			| **optional** <p>Kitchen's name.</p>							|
| phone			| String			|  <p>Kitchen's phone.</p>							|
| description			| String			| **optional** <p>Kitchen's description.</p>							|
| type			| String			|  <p>Kitchen's type.</p>							|
| address			| String			|  <p>Kitchen's address.</p>							|
| region			| String			|  <p>Kitchen's region.</p>							|
| postalCode			| Number			|  <p>Kitchen's postal code.</p>							|
| size			| Number			|  <p>Kitchen's size.</p>							|
| AFSCA			| String			| **optional** <p>Kitchen's AFSCA.</p>							|
| VAT			| String			|  <p>Kitchen's VAT.</p>							|
| days			| Object			|  <p>Kitchen's working weekdays. (e.g {daysFrom: 1, daysTo: 0})</p>							|
| hours			| Object			|  <p>Kitchen's work hours. (e.g {hoursFrom: 0, hoursTo: 24})</p>							|
| capacity			| Number			| **optional** <p>Kitchen's capacity.</p>							|
| price			| Number			|  <p>Kitchen's hourly price, excl. service fee and VAT.</p>							|
| rent			| Number			| **optional** <p>Kitchen's monthly price, excl. service fee and VAT.</p>							|
| equipment			| Object			| **optional** <p>Kitchen's equipment.</p>							|
| staff			| Object			| **optional** <p>Kitchen's additional services.</p>							|
| cancellation			| String			| **optional** <p>Kitchen's cancellation policy.</p>							|
| events			| Boolean			| **optional** <p>Kitchen's events.</p>							|
| standingCapacity			| Number			| **optional** <p>Kitchen's standing capacity for events.</p>							|
| sittingCapacity			| Number			| **optional** <p>Kitchen's sitting capacity for events.</p>							|

## Delete kitchen image(s)



	POST /kitchens/:id/images/delete


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| images			| Object[]			|  <p>Image(s) to be deleted.</p>							|

## Delete kitchen



	DELETE /kitchens/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Find kitcher by user id



	POST /kitchens/user/:userid


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve kitchen



	GET /kitchens/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			| **optional** <p>user access token for full view.</p>							|

## Retrieve kitchens



	GET /kitchens


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| verified			| Boolean			| **optional** <p>kitchen verification status.</p>							|
| region			| String			| **optional** <p>kitchen region.</p>							|
| type			| String			| **optional** <p>kitchen type.</p>							|
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
| name			| String			| **optional** <p>Kitchen's name.</p>							|
| phone			| String			|  <p>Kitchen's phone.</p>							|
| description			| String			| **optional** <p>Kitchen's description.</p>							|
| type			| String			|  <p>Kitchen's type.</p>							|
| address			| String			|  <p>Kitchen's address.</p>							|
| region			| String			|  <p>Kitchen's region.</p>							|
| postalCode			| Number			|  <p>Kitchen's postal code.</p>							|
| size			| Number			|  <p>Kitchen's size.</p>							|
| AFSCA			| String			| **optional** <p>Kitchen's AFSCA.</p>							|
| VAT			| String			|  <p>Kitchen's VAT.</p>							|
| days			| Object			|  <p>Kitchen's working weekdays. (e.g {daysFrom: 1, daysTo: 0})</p>							|
| hours			| Object			|  <p>Kitchen's work hours. (e.g {hoursFrom: 0, hoursTo: 24})</p>							|
| capacity			| Number			| **optional** <p>Kitchen's capacity.</p>							|
| price			| Number			|  <p>Kitchen's hourly price, excl. service fee and VAT.</p>							|
| rent			| Number			| **optional** <p>Kitchen's monthly price, excl. service fee and VAT.</p>							|
| equipment			| Object			| **optional** <p>Kitchen's equipment.</p>							|
| staff			| Object			| **optional** <p>Kitchen's additional services.</p>							|
| cancellation			| String			| **optional** <p>Kitchen's cancellation policy.</p>							|
| events			| Boolean			| **optional** <p>Kitchen's events.</p>							|
| standingCapacity			| Number			| **optional** <p>Kitchen's standing capacity for events.</p>							|
| sittingCapacity			| Number			| **optional** <p>Kitchen's sitting capacity for events.</p>							|
| verified			| Boolean			| **optional** <p>Kitchen's verification status.</p>							|

## Upload kitchen image



	POST /kitchens/:id/images/upload


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| image			| String			|  <p>Image to be added (data-uri).</p>							|

# Order

## Create order



	POST /orders


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| type			| String			|  <p>Order's type.</p>							|
| dateFrom			| Date			| **optional** <p>Order's dateFrom.</p>							|
| dateTo			| Date			| **optional** <p>Order's dateTo.</p>							|
| daysFrom			| Number			| **optional** <p>Order's daysFrom.</p>							|
| daysTo			| Number			| **optional** <p>Order's daysTo.</p>							|
| hoursFrom			| Number			| **optional** <p>Order's hoursFrom.</p>							|
| hoursTo			| Number			| **optional** <p>Order's hoursTo.</p>							|
| totalDays			| Number			| **optional** <p>Order's totalDays.</p>							|
| totalHours			| Number			| **optional** <p>Order's totalHours.</p>							|
| totalPrice			| Number			| **optional** <p>Order's totalPrice.</p>							|
| kitchen			| Object			|  <p>Order's kitchen.</p>							|

## Delete order



	DELETE /orders/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve order



	GET /orders/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve orders



	GET /orders


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update order



	PUT /orders/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| type			| String			|  <p>Order's type.</p>							|
| dateFrom			| Date			| **optional** <p>Order's dateFrom.</p>							|
| dateTo			| Date			| **optional** <p>Order's dateTo.</p>							|
| daysFrom			| Number			| **optional** <p>Order's daysFrom.</p>							|
| daysTo			| Number			| **optional** <p>Order's daysTo.</p>							|
| hoursFrom			| Number			| **optional** <p>Order's hoursFrom.</p>							|
| hoursTo			| Number			| **optional** <p>Order's hoursTo.</p>							|
| totalDays			| Number			| **optional** <p>Order's totalDays.</p>							|
| totalHours			| Number			| **optional** <p>Order's totalHours.</p>							|
| totalPrice			| Number			| **optional** <p>Order's totalPrice.</p>							|
| kitchen			| Object			|  <p>Order's kitchen.</p>							|

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
| phone			| String			| **optional** <p>User's phone.</p>							|
| firstName			| String			| **optional** <p>User's first name.</p>							|
| lastName			| String			| **optional** <p>User's last name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| kitchenOwner			| Boolean			| **optional** <p>User is kitchen owner or not.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|
| lang			| String			| **optional** <p>User's language preference.</p>							|

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
| phone			| String			| **optional** <p>User's phone.</p>							|
| firstName			| String			| **optional** <p>User's first name.</p>							|
| lastName			| String			| **optional** <p>User's last name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| kitchenOwner			| Boolean			| **optional** <p>User is kitchen owner or not.</p>							|
| lang			| String			| **optional** <p>User's language preference.</p>							|

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
| phone			| String			| **optional** <p>User's phone.</p>							|
| firstName			| String			| **optional** <p>User's first name.</p>							|
| lastName			| String			| **optional** <p>User's last name.</p>							|
| region			| String			| **optional** <p>User's home region.</p>							|
| activity			| String			| **optional** <p>User's professional activity.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| kitchenOwner			| Boolean			| **optional** <p>User is kitchen owner or not.</p>							|
| lang			| String			| **optional** <p>User's language preference.</p>							|

## Verify user account



	GET /users/:id/:token



