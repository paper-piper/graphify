CREATE TABLE nodes(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title integer GENERATED ALWAYS AS IDENTITY UNIQUE
);

CREATE TABLE edges(
    source_node UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    target_node UUID NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    PRIMARY KEY(source_node, target_node)
);