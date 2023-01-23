pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.29.0-focal'
    } 
  }
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm ci
          npx playwright install
        '''
      }
    }
   
    stage('test') {
      steps {
        sh '''
          npm run test:prod
        '''
      }
      
    }
  }
}
