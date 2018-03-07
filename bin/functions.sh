function hack {
    docker-compose -p medit-hack -f vm/docker-compose.hack.yml up -d
    docker exec -it medithack_devbox_1 /bin/sh
}

function cleanup-hack {
    docker-compose -p medit-hack -f vm/docker-compose.hack.yml kill
    docker-compose -p medit-hack -f vm/docker-compose.hack.yml rm -f
}
