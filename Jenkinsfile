pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        WEB_SERVER = '172.31.5.150'
        WEB_USER   = 'ubuntu'
        SSH_KEY    = '/var/lib/jenkins/.ssh/id_ed25519'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Downloading portfolio portfolio from GitHub...'
                checkout scm
            }
        }

        stage('Validate Files') {
            steps {
                sh '''
                    test -f index.html
                    test -f style.css
                    test -f script.js

                    echo "Required portfolio files are available"
                    ls -lh
                '''
            }
        }

        stage('Test JavaScript') {
            steps {
                sh '''
                    if command -v node >/dev/null 2>&1; then
                        node --check script.js
                        echo "JavaScript validation successful"
                    else
                        echo "Node.js is not installed; skipping JavaScript syntax check"
                    fi
                '''
            }
        }

        stage('Test SSH Connection') {
            steps {
                sh '''
                    ssh \
                      -i "${SSH_KEY}" \
                      -o IdentitiesOnly=yes \
                      -o BatchMode=yes \
                      "${WEB_USER}@${WEB_SERVER}" \
                      'echo "SSH CONNECTION SUCCESSFUL"; hostname; whoami'
                '''
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh '''
                    rsync -avz --delete \
                      --exclude=".git" \
                      --exclude=".gitignore" \
                      --exclude="Jenkinsfile" \
                      --exclude="README.md" \
                      -e "ssh -i ${SSH_KEY} -o IdentitiesOnly=yes -o BatchMode=yes" \
                      ./ "${WEB_USER}@${WEB_SERVER}:/var/www/html/"
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    sleep 2

                    curl \
                      --fail \
                      --silent \
                      --show-error \
                      "http://${WEB_SERVER}/" \
                      > /dev/null

                    echo "Website returned a successful HTTP response"
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

        always {
            echo "Pipeline completed: ${BUILD_TAG}"
        }
    }
}
