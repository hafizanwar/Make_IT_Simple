```markdown
# Beaconhill-beakend

## Table of Contents
- Code Merged in Branch
- Deployment through Azure CI/CD Pipeline
- How to Test

## Code Merged in Branch
The code has been merged into the azure devops and the branch is `main`. To view the latest changes, please ensure you have checked out the correct branch.

### Checking Out the Branch
To check out the branch where the code has been merged, use the following git command:
```sh
git checkout main
```

### Pull the Latest Changes
Make sure to pull the latest changes from the remote repository:
```sh
git pull origin main
```
##Create HTTPTrigger function
To create a HTTPTrigger function go to related folder on your local environment and run the following command
func new --template "Http Trigger" --name MyHttpTrigger
For Starting the function
func start

### Steps to Create Azure Function App
1. **Log in to Azure Portal**: Go to [Azure Portal](https://portal.azure.com) and log in with your Azure account.

2. **Create a New Resource**:
   - Click on the "Create a resource" button (+) on the left sidebar.

3. **Search for "Function App"**:
   - In the search bar, type "Function App" and select it from the dropdown.

4. **Create Function App**:
   - Click the "Create" button to start the creation process.

5. **Configure the Basics**:
   - **Subscription**: Select your Azure subscription.
   - **Resource Group**: Create a new resource group or select an existing one.
   - **Function App Name**: Enter a unique name for your Function App.
   - **Region**: Select the region closest to your users or your development team.

6. **Hosting**:
   - **Storage Account**: Create a new storage account or use an existing one.
   - **Operating System**: Select the OS (Linux).
   - **Plan Type**: Choose the plan type

7. **Review and Create**:
   - Review your configuration and click the "Create" button. The deployment process will begin.

8. **Deployment Completion**:
   - Wait for the deployment to complete. You can monitor the progress from the Notifications (bell icon) at the top right corner of the portal.

## Deployment through Azure CI/CD Pipeline
The project is deployed using Azure CI/CD pipeline. Below are the details for setting up and running the pipeline.

### Prerequisites
- Azure DevOps account
- Access to the Azure DevOps project repository
- Proper permissions to create and run pipelines

### Setting Up the Pipeline
1. **Navigate to Azure DevOps**: Log in to your Azure DevOps account and navigate to your project.
2. **Create a New Pipeline**:
   - Go to the Pipelines section.
   - Click on "New Pipeline".
3. **Connect to Your Repository**:
   - Select the repository where your code is hosted.
4. **Configure the Pipeline**:
    Configure CI Classic pipeline
        - Add Bash Task to check the the .net files
        - Add Node.js tool Installer to install the node version
        - Add npm task to install Application Dependencies
        - Add npm task to run the build task
        - Add Archive file task 
        - Add Publish build artifacts
    Configure CD pipeline
        - Select the build artifacts
        - Select the service connection we create 
        - Select the app type
        - Select the app service name
        - Select zip file path 
        - Select runtime stack
        - Select startup command

### Running the Pipeline
1. **Trigger the Pipeline**: Push changes to the `main` branch to automatically trigger the pipeline.

## How to Test
1. Go to portal.azure.com 
2. Select the azure function you created
3. there you see the functions tab there is all functions list you have created
4. Click on related function
5. Select Code+Test option
6. Code is already written just click on Test/Run button
7. If you get the response code 200 then its mean your function is working fine else there is some issue with your function.

### Prerequisites
- Node.js installed
- npm installed

### Steps to Test Locally
1. Clone the Repository
2. Checkout the Branch
3. Install Dependencies
4. Run the Application
5. Access the Application
   Open your web browser and navigate to `URL which is given in the output`.
