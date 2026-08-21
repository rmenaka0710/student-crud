pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    stages {
        stage('Verify Node.js') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
    steps {
        sh 'rm -rf node_modules'
        sh 'npm ci'
    }
}

stage('Run Tests') {
    steps {
        sh 'npm test'
    }
}
        stage('Build') {
            steps {
                echo 'Application build completed successfully!'
            }
        }
    }
}
