# Citizen Health Medit Token Infrastructure

## Run

requires docker and \\*nix shell to run

  

run

```bash

./medit hack

```

  

which will expose localhost:3000 with

  

/api/total - total medit in circulation

  

/api/owned - total owned by the controlling account

  

/api/ownedby/:address - total owned by :address

  

/api/mint/:amount - mint new medit which is owned by controlling account

  

/api/transfer/:address/:amount - transfer :amount from controlling

account to :address

  

## Deployment to Google Compute Engine
 1. Go to [Citizen Health Google Compute Engine Dashboard](https://console.cloud.google.com/compute/instances?project=medit-197523) and select the ***medit-services*** instance. 
 2. SSH to it using the right button on the instance row.
 3. The the code from the **medit** Git repo is in */home/dev/medit*
 4. Synch the instance code with Git
 5. Run the docker compose file
 ```
docker run -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="/rootfs/$PWD" docker/compose:1.19.0 -p medit-hack -f /home/dev/medit/vm/docker-co
mpose.hack.yml up -d
```
 6. Open the **External IP** of the instance. You can find it in the dashboard on the instance row. For the current instance it's http://35.196.243.107:3000/ and add the API endpoints: /api/total, ...