pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        WEB_SERVER = '172.31.5.150'
        WEB_USER = 'ubuntu'
        SSH_KEY = '/var/lib/jenkins/.ssh/id_ed25519'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Downloading portfolio from GitHub'
                checkout scm
            }
        }

        stage('Validate') {
            steps {
                sh '''
                    test -f index.html
                    test -f style.css
                    test -f script.js

                    echo "Portfolio files are valid"
                    ls -lh
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    rsync -avz --delete \
                      --exclude=".git" \
                      --exclude="Jenkinsfile" \
                      --exclude="README.md" \
                      -e "ssh -i ${SSH_KEY} -o IdentitiesOnly=yes -o StrictHostKeyChecking=no" \
                      ./ ${WEB_USER}@${WEB_SERVER}:/var/www/html/
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    sleep 2
                    curl --fail --silent --show-error \
                      http://${WEB_SERVER}/ > /dev/null

                    echo "Portfolio deployment successful"
                '''
            }
        }
    }

    post {
        success {
            echo 'PORTFOLIO DEPLOYED SUCCESSFULLY'
        }

        failure {
            echo 'PORTFOLIO DEPLOYMENT FAILED'
        }
    }
}
