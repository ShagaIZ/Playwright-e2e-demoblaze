pipeline {
  agent any 
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
