# Things

## Key

A key is a string that uniquely identifies something known and enumerated
in code. All values are always known at compile time, and are never
dynamically generated.

## Uid

A unique identifier for something, that is not known at compile time, and
is generated dynamically.

In this project, uids mo

## Definitions (`ThingDef`)

A definition of something, not JSON-serializable, as it probably contains
zod schemas, and is likely built through function calls.

Does not include frontend or backend-specific code.

Most things that have a backend and a frontend should have a definition
as well, and be in a directory together.

## Entity Roles  

A role that an entity plays in the system: `output`, `mapping`, etc..


## Entity Kind

A kind of entity, like `local-output`, `strip-fixture`, etc..
