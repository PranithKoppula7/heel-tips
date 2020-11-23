# API Documentation
This is the custom backend built for the Heel Tips Website. This is split into two routes: (1) Auth and user based endpoints (2) Posts/Tips based endpoints. The root link is https://heel-tips.herokuapp.com. The root of the auth api starts at ```/api/user``` while the root of the posts starts at ```/api/post ```. 

# Auth/User 

**Root:** https://heel-tips.herokuapp.com/api/user
  
 *Note, there are no endpoints at this root link at this root link. It is for semantics and neatness*

## GET

###  ```/logged-in```

**Purpose:** Returns a boolean on whether the current user is logged in and if their sesison is active.

**Request Params:** None

**Example Response:**

    HTTP Code 200
    true

### ```/logout```

**Purpose:** Logouts out the user and removes the session user object.

**Request Parms:** None

**Example Response:**

    HTTP Code 200
    {success: true, message: "Logged out!"}

### ```/curr-user```

**Purpose:** Gets some user details about the current logged in user.

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

### ```/bookmarks```

**Purpose:** Gets the users bookmarked tips

**Request Parms:** None

**Example Response:**

    HTTP Code 200
     [
        { postObj },
        { postObj },
        ...
     ]


## POST

### ```/bookmark/:id```

**Purpose:** adds the post the user requested into their bookmarks. 

**Request Parms:** Id of the post

**Request Body:** Id of the user requesting the bookmarking.

**Example Response:**

    HTTP Code 200
    { success: true, message: "Bookmarked!" }
    
### ```/unbookmark/:id```

**Purpose:** removes the post the user requested into their bookmarks. 

**Request Parms:** Id of the post

**Request Body:** Id of the user requesting the unbookmarking.

**Example Response:**

    HTTP Code 200
    { success: true, message: "Un-bookmarked" }
    
### ```/register```

**Purpose:** registers a user in the database

**Request Parms:** None

**Request Body:** JSON object of the user being registerd

    {
       name: 'Name',
       email: 'Email',
       password: 'password',
       pid: 23092323
    }

**Example Response:**

    HTTP Code 200
    { success: true, user: { MongoDB created User...} }
    
### ```/login```

**Purpose:** login the user and create a cookie at the backend using sessions state

**Request Parms:** None

**Request Body:** JSON credentials of the user to login

    {
       email: 'Email',
       password: 'password'
    }

**Example Response:**

    HTTP Code 200
    { success: true, user: { MongoDB created User...} }


## PUT

###  ```/:id```

**Purpose:** updates the user details, specifically email, name, and pid. 

**Request Parms:** Id of the user

**Request Body:** User details to change in JSON

    {
       email: 'Email Change',
       name: 'Name Change',
       pid: 234134
    }

**Example Response:**

    HTTP Code 200
    { success: true, message: "success!" }



