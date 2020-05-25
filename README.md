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

#### LoginForm

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

    - Create a component called Header
    - Props
        - Username
    - Methods
        - onClickAdminProfile()
        - onLogout()

#### AdminDashboard

    - Create a component called AdminDashboard
    - Props
        - adminFormsData
        - onCreateNewForm()
        - onEditForm()
        - onDeleteForm()
        - onRenameForm()

#### NewFormScreen

    - _AddQuestion_ Component
        - Methods
            - onAddQuestion()
    - _QuestionsListUI_ Component
        - Props
            - questionsList
            - onEditQuestionData()
            - onDeleteQuestion()
            -
    - _QuestionSettingsUI_ Component
        - Props
    - Props
        - questionsList
        - onAddQuestion()
        - onEditQuestion()
        - onDeleteQuestion()

#### Stores

##### AdminDataStore

-  Maintains Admin's data throughout the application

#### Services

##### AdminDataAPI

-  Which will give the Admin data or Admin's Form data
   -Methods - constructor() - create an api using apisauce's create method - getAdminData() - returns an networkCallWithapisauce promise

##
