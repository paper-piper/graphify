CREATE OR REPLACE FUNCTION normalize_edge_direction()
RETURNS TRIGGER AS $$
DECLARE
    tmp UUID;
BEGIN
    IF NEW.source_node < NEW.target_node THEN
        tmp := NEW.source_node;
        NEW.source_node := NEW.target_node;
        NEW.target_node := tmp;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER normalize_edge_before_insert
BEFORE INSERT ON edges
FOR EACH ROW EXECUTE FUNCTION normalize_edge_direction();