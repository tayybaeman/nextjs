pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('np')
    }

    stages {

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'No test script available'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to Vercel') {
            steps {
                bat """
                    npx vercel --prod --yes --token %VERCEL_TOKEN%
                """
            }
        }
    }
}
