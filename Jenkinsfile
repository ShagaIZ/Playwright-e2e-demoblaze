pipeline {
  agent any
  stages {
    stage('install ci') {
      steps {
        sh '''
          npm install
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
      post {
        success {
          archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          sh 'rm -rf *.png'
        }
      }
    }
  }
}