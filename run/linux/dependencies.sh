# clear
printf "==============  Instalando Dependencias do Projeto =============="
printf "\n"
printf "\n"
    if [ -d "./node_modules" ]; then
        sudo rm -rf "./node_modules"
    else 
        printf "\n"
    fi
printf "\n"
npm install
printf "\n"
printf "\n"
printf "============  Dependencias Instaladas com Sucesso  ===========\n"
printf "\n"
printf "\n"