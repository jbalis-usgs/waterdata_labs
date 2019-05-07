pipeline {
  agent {
    node {
      label 'project:any'
    }
  }
  parameters {
    choice(choices: ['development', 'staging', 'production'], description: 'deployment environment', name: 'DEPLOY_TIER')
  }
  stages {
    stage('Build') {
      agent {
        dockerfile {
          additionalBuildArgs "--build-arg HUGO_COMMAND=build --build-arg DEPLOY_TIER=$DEPLOY_TIER --build-arg AWS_SYNC=sync_yes"
          args '-u root:root -v "${WORKSPACE}":/src'
          reuseNode true
        }
      }
      steps {
        echo 'build complete'
        sh "/src/buildDeploy.sh build ${DEPLOY_TIER} sync_yes"
      }
    }
  }
}