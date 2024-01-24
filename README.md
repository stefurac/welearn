# WeLearn

App: https://peaceful-mesa-23508.herokuapp.com/home

WeLearn is an online learning platform that encourages users to learn as well as teach by using a in-app currency called WeLearn points. Once a user signs up, he/she is able to upload content in a streamlined fashion for any other existing users to view. He/she is also able to view content uploaded by other users – that is, if the user has enough credits. One of the key features of the app is that users are provided with a limited number of credits after they register, and each “course” requires a specified number of credits in order to enrol. The only way to gain more credits is to upload educational content of one’s own or rate another user’s course. Once a user has acquired enough tokens, he/she will be able to enroll in more courses. This credit system incentivizes all users to both teach and learn materials (taken from project proposal). 

## Authors:

**Team 13:**

- Tim Fei
- Griffin Yacynuk
- Cynthia Wang
- Cassandra Stefura

## Usage

### Demo Video
Please check out the video on --> https://www.youtube.com/watch?v=O5rsRhnSzqQ

[![Demo phase 2](http://img.youtube.com/vi/O5rsRhnSzqQ/0.jpg)](https://www.youtube.com/watch?v=O5rsRhnSzqQ "Demo")

↑↑↑click for the complete flow!
### Login and Registration Guide:

**User Registration**

You must enter all of your credentials in order to register with WeLearn. Once registered, these credentials can be used to login as a new user.

**User Login**

You may login as a user that exists with the following credentials:

username: `user` <br />
password: `user` <br />

You may also login as a user that has successfully signed up as a user. 

**Admin Login**

You may login as an administrative user exists with the following credentials:

username: `admin` <br />
password: `admin` <br />

#### Guest Guide:

1. View existing courses

A user is able to view courses from the "Browse Courses" button via navigation bar. A user is able to search for a specific course, or browse existing courses.

#### User Guide:

1. View and Edit Profile Information

A user is able to view their profile via navigation bar. Here they will be able to view their credentials, as well as the amount of points that they have to spend on courses.

A user is able to edit their profile picture and biography at this point.

2. View existing courses

A user is able to view courses from the "Browse Courses" button via navigation bar. A user is able to search for a specific course, or browse existing courses. In order to see more information about a course, a user may click on any courses that interest them when browsing. 

3. Purchase, Wishlist, and Review courses

From a specific course page, a user can view the course rating, author, description, goals of the course, as well as reviews. A user may purchase a course if they have enough points, or wishlist a course. If enrolled, they may leave at most one review. 

4. User Dashboard [View User Activity]

A user is able to access their dashboard via navigation bar. In the dashboard, active users will be able to view their purchased courses, recent courses, recent activity, statistics regarding the user's activity, and a wishlist of courses they would like to take, but perhaps do not have enough points for.

5. View Created Courses

In order to obtain more points or view created courses, a user can create more courses in the Creator Center via navigation bar. Active users will be able to view courses that have been created, analytics regarding existing courses, and create new courses. 

6. Create a new Course

To create a new course, a user must complete all required fields in the course template. Once the necessary information has been included, a user is free to add additional content in the form of text, videos, and images. 

#### Admin Guide

1. Admin Dashboard [View Admin Activity]

An administrative user is able to delete courses, comments, and users, as well as view their recent activity, in "Admin Dashboard" via navigation bar. 

An admin may also Browse Courses, create Courses, and view their Profile. 

## A note on server calls
In order to facilitate a smooth and easy refactor for Phase 2, we have delegated all of our server calls to functions which reside in the files under `/src/api`. Currently, these functions return hard-coded mock data. In Phase 2, we will replace this hard-coded data with actual server calls.

## Tools and libraries used
- Create React App
- React Styled Components
- React Router
- Material UI
- Redux
- Redux Saga
- SlateJS
- ChartJS
- React Toastify
- Mongo
- Mongoose
- Express

<br>
<br>

## Routes
*Note: For any calls to course, transaction, user, courseProgress, studyProgress you MUST be logged in /api/auth/login*

<br>
<br>

### `Authentication Routes`

<br>

**1.** Authenticate a User / Login<br />
**Type:** POST<br />
**Endpoint:** `/api/auth/login` <br />
**Request Body:**
```
{
	"username": "user",
	"password": "user"
}
```
**Response:** Redirect to Dashboard<br />

<br>

**2.** Logout and destroy current user session <br />
**Type:** POST <br />
**Endpoint:** `/api/auth/logout` <br />
**Request Body:**  -- <br />
**Response:**  Redirect to Home <br />

<br>

**3.** Check whether not there already exists a user with a particular username <br />
**Type:** GET <br />
**Endpoint:** `/api/auth/username-exists/:username` <br />
**Response:** A boolean value that indicates whether or not the username already exists <br />
 
<br>
<br>
 
### `Course Progress Routes`

<br>

**1.** Retrieve the progress of a specific course for a specific user. Must be the owner of the account to do so.<br />
**Type:** GET <br/>
**Endpoint:** `/api/course-progress/:userId/:courseId`<br />
**Response:** A course Progress Object, which is a representation of the course progress for a specific user<br/>

<br>

**2.** Update the course progress for a specific user. If the course progress doesn't exist yet, create one. Must be the owner of the account to do so.<br />
**Type:** POST <br />
**Endpoint:** `/api/course-progress/:userId/:courseId`<br />
**Request body:** 
```
{
  "userId": "some id",
  "courseId": "some id",
  "lastUsedSectionId": "some section ID",
  "studyTimeMins": 1.5,
  "progress": 50,
  "sectionProgress": []
}
```
**Response:** A course Progress Object, which is a representation of the course progress for a specific user. <br/>

<br>
<br>



### `Course Routes`

<br>

**1.** Get all courses from the database <br />
**Type:** GET  <br />
**Endpoint:** `/api/courses`<br />
**Query Params:** `publishedOnly=true/false`
**Response:** An array of course objects from the database. If `publishedOnly=true` then only return published courses.<br />

<br>

**2.** Get a course from the database by course ID. Must be logged in to do so. If `populateSections=true`, then must own the course, have created the course, or be an admin to do so.<br />
**Type:** GET <br />
**Endpoint:** `/api/courses/:courseId` <br />
**Query Params:** `populateSections=true/false`
**Response:** A single course with the matching course ID. If `populateSections=true`, then course sections will be a list of objects instead of IDs.<br />

<br>

**3.** Insert a course into the database. Must be logged in to do so.<br />
**Type:** POST<br />
**Endpoint:** `/api/courses` <br />
**Request body:** <br />
```
{
    "title": "test course",
    "image": "https://t4.ftcdn.net/jpg/01/26/92/23/360_F_126922352_EmYCsPhTG1Dww3o2mnfb6Y3C4ex1u7Vz.jpg",
    "description": "test",
    "learningObjective": "test",
    "cost": 300,
    "sections": [
    	{
	    "title": "Section title",
	    "courseMaterials": [
	        {
		    "type": "image",
		    "content": "https://t4.ftcdn.net/jpg/01/26/92/23/360_F_126922352_EmYCsPhTG1Dww3o2mnfb6Y3C4ex1u7Vz.jpg"
		}
	    ]
	}
    ]
}
```

**Response:** The inserted course object<br />

<br>

**4.** Modify one or more fields in a course object. Must the the course creator, or admin to do so.<br />
**Type:** PATCH<br />
**Endpoint:** `/api/courses/:courseId` <br />
**Request body:** One or more of the following fields <br />
```
{
    "title": "test course,
    "image": "https://t4.ftcdn.net/jpg/01/26/92/23/360_F_126922352_EmYCsPhTG1Dww3o2mnfb6Y3C4ex1u7Vz.jpg",
    "description": "test",
    "learningObjective": "test",
    "cost": 300,
    "isPublished": true,
    "sections": [
    	{
	    "title": "Section title",
	    "courseMaterials": [
	        {
		    "type": "image",
		    "content": "https://t4.ftcdn.net/jpg/01/26/92/23/360_F_126922352_EmYCsPhTG1Dww3o2mnfb6Y3C4ex1u7Vz.jpg"
		}
	    ]
	}
    ]
}
```

**Response:** The course object after it has been modified.<br />

<br>

**5.** Delete a course by ID from the database. Must be the course creater, or an admin.<br />
**Type:** DELETE<br />
**Endpoint:** `/api/courses/:courseId` <br />
**Response:** the course object that has been deleted from the database.<br />

<br>
<br>

### `Development Tool Routes`
(These routes are **only** available in **development**, not prod)

<br>

**1.** Create a new course, with extra control over fields<br />
**Type:** POST<br />
**Endpoint:** `/api/dev-tools/upload-course` <br />
**Request body:** 
```
{
    "title": "How to Speak Spanish",
    "image": "https://t4.ftcdn.net/jpg/01/26/92/23/360_F_126922352_EmYCsPhTG1Dww3o2mnfb6Y3C4ex1u7Vz.jpg",
    "description": "A guide on how to learn spanish",
    "learningObjective": "Spanish",
    "ownerId": "someId",
    "author": "first last",
    "lastModified": "4/9/2021, 11:13:49 PM",
    "cost": 100,
    "sections: []
}
```
**Response:** The newly added course object. <br />

<br>
<br>

### `Study Record Routes`

<br>

**1.** Get a heatmap of the study progress for the current session user<br />
**Type:** GET<br />
**Endpoint:** `/api/study-record/user/heatmap`<br />
**Response:** Daily user study data over the past 26 weeks<br />

<br>

**2.** Get a summary of activity for the current session user<br />
**Type:** GET<br />
**Endpoint:** `/api/study-record/user/summary` <br />
**Response:** A summary of the user's study time<br />

<br>

**3.** Get a summary of user activity in terms of content creation (creator statistics) for the current session user<br />
**Type:** GET<br />
**Endpoint:** `/api/study-record/creator-statistics`<br />
**Response:** An object that represents the statics pertaining to a course creator, in a format that is easy to graph<br />

<br>
<br>


### `Transaction Routes`

<br>

**1.** Allows a user to purchase a course. Will purchase course for the current session user.<br />
**Type:** POST<br />
**Endpoint:** `/api/purchase-course` <br />
**Request body:** <br />
```
{
 "courseId": "someId"
}
```
**Response:** Updated user object (with course added to boughtCourses), and success flag or error message<br />

<br>

**2.** Allows a user to post a review (comment) on a course’s details page. They must be the account owner, and have bought or created the course.<br />
**Type:** POST<br />
**Endpoint:** `/api/review-course` <br />
**Request body:**<br />
```
{
    "userId": "someId",
    "courseId": "someId"
    "comment": "sample comment",
    "username": "sample username",
    "rating": 4.5
}
```

**Response:** Same fields as the request body, plus a success flag or error message<br />


<br>

**3.** Allows a user to delete a review (comment) on a course’s details page. They must be the account owner, or an admin to do so.<br />
**Type:** DELETE<br />
**Endpoint:** `/api/delete-course-review` <br />
**Request body:**<br />
```
{
 "userId": "someId",
 "courseId": "someId"
}
```
**Response:** Same fields as the request body<br />

<br>

**4.** Allows the user to rate a course out of 5 stars. They must be the account owner, and have bought or created the course to do so (or be an admin).<br />
**Type:** POST<br />
**Endpoint:** `/api/rate-course`<br />
**Request body:** <br />
```
{
 "userId": "someId",
 "courseId": "someId",
 "rating": 4.5
}
```
**Response:** Same fields as the request body, plus a success flag or error message<br />

<br>
<br>


### `User Routes`

<br>

**1.**  Get all the users from the database. Must be an admin to do so.<br />
**Type:** GET<br />
**Endpoint:** `/api/users`<br />
**Response:** A list of all the user objects from the database<br />

<br>

**2.**  Get specific user from the database. Must be the account owner or admin to do so.<br />
**Type:** GET<br />
**Endpoint:** `/api/users/:userId`<br />
**Response:** A user object that matches the ID provided in the endpoint URL<br />

<br>

**3.** Insert a user into the database<br />
**Type:** POST<br />
**Endpoint:** `/api/users` <br />
**Request body:**<br />
```

{
    "username": "name",
    "password": "pass",
    "firstName": "first",
    "lastName": "last",
    "dob": "2005-12-01",
    "email": "test@email.com",
    "isAdmin": false,
    "boughtCourses": [],
    "wishListedCourses": [],
    "createdCourses": [],
    "balance": 100
}

```

**Response:** The inserted user object<br />

<br>

**4.** Modify one or more fields in a user object. Must be the owner of the account or an admin to do so.<br />
**Type:** PATCH<br />
**Endpoint:** `/api/users/:userId` <br />
**Request body:** One or more of the following fields <br />
```

{
    "firstName": "first",
    "lastName": "last",
    "profilePicture": "https://t4.ftcdn.net/jpg/01/26/92/23/360_F_126922352_EmYCsPhTG1Dww3o2mnfb6Y3C4ex1u7Vz.jpg",
    "bio": "a little about me..."
}

```

**Response:** The user object after it has been modified.<br />

<br>

**5.** Delete a user by ID from the database. Must be the owner of the account, or an admin to do so.<br />
**Type:** DELETE<br />
**Endpoint:** `/api/users/:userId` <br />
**Response:** the user object that was deleted from the database.<br />

<br>

**6.** Promote a user to an admin. Request must be initiated by an admin.<br />
**Type:** POST<br />
**Endpoint:** `/api/users/promote-to-admin/:userId` <br />
**Request body:** none
**Response:** the user who was promoted to admin<br />

<br>

## Error Codes
 - **400:** Bad Request, something the caller provided was incorrect
 - **401:** Unathenicated, the caller does not have an active session, but the request requires one
 - **403:** Forbidden, the caller does not have permission to make this request
 - **404:** Not found, a resource requested does not exist
 - **500:** Internal Sever Error

<br>
<br>
<br>

## How to run this app locally

### `node server.js`

Runs the backend server (http://localhost:8000)

### `cd frontend && yarn start`

Runs the front app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


