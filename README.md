# Formaster

## Authentication

### Components

#### Common

    - LoadingWrapperWithFailureOrSuccessState

#### SignupForm

    - Create a component called SignupForm

    -Props
        - Name:string
        - UserName:any
        - Password:any
        - Confirm Password:any
        - onChangeName()
        - onChangeUserName()
        - onChangePassword()
        - onChangeConfirmPassword()
        - onClickSignup()

#### LoginForm -V1

    - Create a component called LoginForm

    -Props
        - userName:any
        - password:any
        - onClickLogin()

### Stores

#### Authentication Store

    - Create a AuthStore which will Get/Set the user data using AuthAPI

### Constants

    - Endpoint APIs
    - Error Messages
        - Username Error
        - Password strength error
        - Authentication acces error (Admin/User)

### Services

#### Authentication Service

    - Create a AuthAPI which will Get/Post the User Signin/SignUp data
    -Methods
        -GetUserSigninAPI()
        -SetUserSignupAPI()

### fixtures

    - admin-auth-data.json
    - user-auth-data.json

### routes

    - LoginRoute
        - State Variables
            - userName:any
            - password:any
            - errorMessage: string

        -Methods
            - onChangeUserName()
            - onChangePassword()
            - onClickLogin()


    - SignUpRoute
        - State Variables
            - Name:string
            - UserName:any
            - Password:any
            - Confirm Password:any
            - errorMessage: string

        - Methods
            - onChangeName()
            - onChangeUserName()
            - onChangePassword()
            - onChangeConfirmPassword()
            - onClickSignup()
            - onSignUpSuccess()
            - onSignUpFailure()

## Admin

### components

#### Header

-  Create a component called Header
   -  Props
      -  Username
   -  Methods
      -  onClickAdminProfile()
      -  onLogout()

#### AdminDashboard

-  Create a component called AdminDashboard
   -  Props
      -  adminFormsData
      -  onCreateNewForm()
      -  onDeleteForm()
      -  onRenameForm()

##### FormsList

-  renders current forms in the formsData
   -  Props
      -  adminFormsData

##### NewFormCard

    - Props
        - onCreateNewForm()

##### DefaultFormCard

    - Props
        - formDetails
        - onRenameForm()
        - onDeleteForm()

    - Methods
        - onEditForm()
            - redirects to new form screen

#### NewFormScreen

    - AddQuestion Component
        - Methods
            - onAddQuestion()
    - QuestionsListUI Component
        - Props
            - questionsList
            - onEditQuestion()
            - onDeleteQuestion()
            - onChangeQuestionTitle()
            - onChangeQuestionDescription()
    - QuestionSettingsUI Component
        - Props
            - questionDetails
            - onToggleRequired()
            - onToggleDescription()

    - QuestionUI Component
        - Props
            - questionDetails
    - FormPreview Component
        - Props
            - questionList
            - navigateToPrevious()
            - navigateToNext()

    - PublishButton Component
        - onClickPublishButton()
    - Props
        - questionsList
        - onAddQuestion()

### Stores

#### FormStore

-  Maintains Form's data

   -  State variables

      -  Formslist : Observable Map()
      -  getFormsAPIStatus
      -  getFormsAPIError

   -  Methods
      -  constructor()
      -  setGetFormsAPIStatus()
      -  setGetFormsAPIError()
      -  setGetFormsAPIResponse()
      -  onCreateNewForm(new FormModel)
      -  onDeleteNewForm()

#### QuestionStore

    - State Variables
        - questionsList:new Observable Map()

    - Methods
        - constructor(questionList)
            - questionList : new QuestionModel(questionList)
        - onAddQuestion()
        - onDeleteQuestion()

### Models

#### FormModel

    - State Variables
        - name
        - questionStore
        - responses : ObservableMap()
    -Methods
        - constructor(questionStore)
            - this.questionStore:questionStore

        - onRenameForm()
        - onEditForm()

#### QuestionModel

    - State Variables
        - title
        - description
        - isRequired
        - response
        - hasDescription

    - Methods
        - constructor(questionData)
            -> initializes the state variables with questionData
        - onChangeQuestionTitle()
        - onChangeQuestionDescription()
        - onToggleRequired()
        - onToggleHasDescription()
        - onSubmitResponse()

### Services

#### AdminDataAPI

    - Methods
        - getAdminFormsData
        - PostAdminFormsDara

### fixtures

    - adminFormsData

### routes

    - DashBoardRoute
    - newFormScreenRoute

## Customer

### components

#### FormUI

    - Props
        - questionsList
        - navigateToPrevious()
        - navigateToNext()
        - onSubmitResponse()

# User form to fill route

# integrate the preview so that user can fill form
