
pipeline {
   agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000' 
        }
    }
    
stages {
       
    stage('Git') {
      steps {
        git 'https://github.com/ShagaIZ/Playwright-e2e-demoblaze'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }  
    
    stage('browser') {
      steps {
        sh 'npx playwright install'
        
      }
    } 
            
    stage('Test') {
      steps {
        sh 'npm run test:prod'
      }
    }
  }
}
