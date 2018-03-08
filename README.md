# Citizen Health Medit Token Infrastructure

requires docker and \*nix shell to run

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
