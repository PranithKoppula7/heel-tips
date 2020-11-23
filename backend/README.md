# API Documentation
This is the custom backend built for the Heel Tips Website. This is split into two routes: (1) Auth and user based endpoints (2) Posts/Tips based endpoints. The root link is https://heel-tips.herokuapp.com

# Auth/User

## GET

###  /api/user/logged-in

**Purpose:** Returns a boolean on whether the current user is logged in and if their sesison is active.
**Request Params:** None
**Example Response:**
    HTTP Code 200
    true

### /api/user/logout

**Purpose:** Logouts out the user and removes the session user object. 
**Request Parms:** None
**Example Response:**
    HTTP Code 200
    {success: true, message: "Logged out!"}

### /api/user/curr-user

**Purpose:** Gets some user details about the current logged in user
**Request Parms:** None
**Example Response:**
    HTTP Code 200
     {
        name: 'Name',
        id: 'Unique ID',
        email: 'email@email.com',
        pid: 32,
        bookmarkedTips: ['unique_id', 'unique_id']
    }






