pipeline {
  agent any 
  stages {
    stage('install node ') {
      steps {
        sh '''
          npm i install
        '''
      }
    }

     stage('install ') {
      steps {
        sh '''
          npm  install
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
