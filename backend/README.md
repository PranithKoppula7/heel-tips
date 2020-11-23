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

**Request Params:** None

**Example Response:**

    HTTP Code 200
    {success: true, message: "Logged out!"}

### ```/curr-user```

**Purpose:** Gets some user details about the current logged in user.

**Request Params:** None

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

**Request Params:** None

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

**Request Params:** Id of the post

**Request Body:** Id of the user requesting the bookmarking.

**Example Response:**

    HTTP Code 200
    { success: true, message: "Bookmarked!" }
    
### ```/unbookmark/:id```

**Purpose:** removes the post the user requested into their bookmarks. 

**Request Params:** Id of the post

**Request Body:** Id of the user requesting the unbookmarking.

**Example Response:**

    HTTP Code 200
    { success: true, message: "Un-bookmarked" }
    
### ```/register```

**Purpose:** registers a user in the database

**Request Params:** None

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

**Request Params:** None

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

**Request Params:** Id of the user

**Request Body:** User details to change in JSON

    {
       email: 'Email Change',
       name: 'Name Change',
       pid: 234134
    }

**Example Response:**

    HTTP Code 200
    { success: true, message: "success!" }


# Post/Tip 

**Root:** https://heel-tips.herokuapp.com/api/post
  
 *Note, there are no endpoints at this root link at this root link. It is for semantics and neatness*
 
 ## GET
 
 ### ```/top-tips```

**Purpose:** Gets the rank-order highest tips from all of the tips posted on the website. Maximum of 3 posts are returned

**Request Params:** None

**Request Body:** None

**Example Response:**

    HTTP Code 200
    [ { post1 }, {post2}, {post3} ]
    

### ```/department-list```

**Purpose:** Gets the list of departments available in the database

**Request Params:** None

**Request Body:** None

**Example Response:**

    HTTP Code 200
    [ 'DEPT', 'DEPT2' ]
    
### ```/class-list```

**Purpose:** Returns all of the unique classes present in the database

**Request Params:** None

**Request Body:** None

**Example Response:**

    HTTP Code 200
    [ 'COMP 110', 'POLI 150' ]

### ```/:id```

**Purpose:** Returns the unique post from id

**Request Params:** Unique id of the post

**Request Body:** None

**Example Response:**

    HTTP Code 200
    { post }
    
### ```/:department/class-list```

**Purpose:** Returns the unique class numbers from the unique departments

**Request Params:** Department that you need that classes from structured as four letter capital code. Ex. ENGL

**Request Body:** None

**Example Response:**

    HTTP Code 200
    { '211', '311', '401' }
    
### ```/:department```

**Purpose:** Returns the posts that contains the department requested

**Request Params:** Department structured in four letter captilized code. Ex. ENGL

**Request Body:** None

**Example Response:**

    HTTP Code 200
    { { post1 }, { post2 }, ... }

### ```/:department/:class-list```

**Purpose:** Returns the posts that contains the department requested and the class listed

**Request Params:** Department structured in four letter captilized code. Ex. ENGL. Class number that is typically 3 digits long.

**Request Body:** None

**Example Response:**

    HTTP Code 200
    { { post1 }, { post2 }, ... }
 
 
## POST
 
### ```/create-post```

**Purpose:** Creates the tip

**Request Params:** None

**Request Body:** JSON Object of the post to be created

    {
       title: 'Title',
      body: 'body',
      author: 'name',
      authorId: 'id',
      created: 'unix date',
      likeCount: 0,
      department: 'ENGL',
      class: 121,
      likedUsers: []
    }

**Example Response:**

    HTTP Code 200
    { success: true, tip: created_tip  }
    
## PUT

### ```/:id```

**Purpose:** Updates the unique post

**Request Params:** Unique id of the post

**Request Body:** None

**Example Response:**

    HTTP Code 200
    { success: true, message: "Updated!" }
    
    
### ```/like/:id```

**Purpose:** Likes the post for the current user and increments the like-count and stores the user in the liked array of post

**Request Params:** Unique id of the post

**Request Body:** None

**Example Response:**

    HTTP Code 200
    { success: true, post: likedPost }
    
### ```/dislike/:id```

**Purpose:** Dislikes the post for the current user and decrements the like-count and removes the user in the liked array of post

**Request Params:** Unique id of the post

**Request Body:** None

**Example Response:**

    HTTP Code 200
    { success: true, post: likedPost }
    
## DELETE

### ```/:id```

**Purpose:** Deletes the post 

**Request Params:** Unique id of the post

**Request Body:** None

**Example Response:**

    HTTP Code 200
    { success: true }
