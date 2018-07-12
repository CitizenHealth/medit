function hack {
    docker-compose -p medit-hack -f vm/docker-compose.hack.yml up -d
    docker exec -it medithack_devbox_1 /bin/sh
}

function live-api {
    docker-compose -p medit-live -f vm/docker-compose.liveapi.yml up -d
}

function cleanup-hack {
    docker-compose -p medit-hack -f vm/docker-compose.hack.yml kill
    docker-compose -p medit-hack -f vm/docker-compose.hack.yml rm -f
}

function cleanup-live {
    docker-compose -p medit-live -f vm/docker-compose.liveapi.yml kill
    docker-compose -p medit-live -f vm/docker-compose.liveapi.yml rm -f
}

function build {
    docker-compose -p medit-hack -f vm/docker-compose.hack.yml build --no-cache
    docker-compose -p medit-live -f vm/docker-compose.liveapi.yml build --no-cache
}

