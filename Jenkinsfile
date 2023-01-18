pipeline {
  agent any
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm install
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