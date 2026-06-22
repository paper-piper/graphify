-- TODO: MIGRATE TO ENTITY AND DOMAIN

CREATE TABLE nodes(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    value VARCHAR(255)
);

CREATE TABLE edges(
    source_node UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    target_node UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    PRIMARY KEY(source_node, target_node),
    UNIQUE(source_node, target_node)
);  