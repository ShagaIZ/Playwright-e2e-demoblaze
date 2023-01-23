pipeline {
  agent any 
  stages {
    stage('install ci') {
      steps {
        sh '''
          npm ci
        '''
      }
    }

     stage('install playwright') {
      steps {
        sh '''
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
